package com.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class AIService {

    private final RestTemplate restTemplate;
    private final ObjectMapper mapper = new ObjectMapper();

    @Value("${groq.api-key}")
    private String apiKey;

    @Value("${groq.model:llama-3.1-8b-instant}")
    private String model;

    @Value("${groq.compound-model:groq/compound}")
    private String compoundModel;

    private static final String CHAT_URL = "https://api.groq.com/openai/v1/chat/completions";
    private static final String TRANSLATION_URL = "https://api.groq.com/openai/v1/audio/translations";

    public AIService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public record TranslatedInput(String englishText, String detectedLanguage) {}

    // Result of one agent step: either a final text answer, or a tool the model wants to call.
    public record AgentStep(String finalText, List<ToolCall> toolCalls, String rawAssistantMessageJson) {}
    public record ToolCall(String id, String name, Map<String, Object> arguments) {}

    // ---------- Text input translation ----------

    public TranslatedInput translateToEnglish(String userText) {
        String r = callSafe(model, "Detect the language of this message and translate it to English. " +
                "Respond with ONLY this JSON, no markdown: {\"englishText\": \"...\", \"detectedLanguage\": \"...\"} " +
                "Message: " + userText);
        if (r == null) return null;
        return new TranslatedInput(field(r, "englishText", userText), field(r, "detectedLanguage", "English"));
    }

    // ---------- Voice input: Whisper ----------

    public TranslatedInput transcribeAndTranslateAudio(String audioBase64, String mimeType) {
        try {
            byte[] audioBytes = Base64.getDecoder().decode(audioBase64);
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(apiKey);
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            LinkedMultiValueMap<String, Object> form = new LinkedMultiValueMap<>();
            ByteArrayResource file = new ByteArrayResource(audioBytes) {
                @Override public String getFilename() { return "audio.webm"; }
            };
            form.add("file", file);
            form.add("model", "whisper-large-v3");

            Map<?, ?> response = restTemplate.postForObject(TRANSLATION_URL, new HttpEntity<>(form, headers), Map.class);
            String text = (String) response.get("text");
            String lang = response.get("language") != null ? response.get("language").toString() : "English";
            return new TranslatedInput(text, lang);
        } catch (Exception e) {
            System.err.println("Whisper failed: " + e.getMessage());
            return null;
        }
    }

    // ---------- Translate final answer back to user's language ----------

    public String translateFromEnglish(String text, String targetLanguage) {
        if (targetLanguage == null || targetLanguage.equalsIgnoreCase("English") || targetLanguage.equalsIgnoreCase("en"))
            return text;
        String r = callSafe(model, "Translate this English text into " + targetLanguage +
                ". Respond with ONLY the translated text. Text: " + text);
        return r != null ? r.trim() : text;
    }

    // ---------- Tool schemas the agent is allowed to use ----------

    public List<Map<String, Object>> buildTools() {
        List<Map<String, Object>> tools = new ArrayList<>();
        tools.add(tool("get_mandi_price",
                "Get the current agricultural market (mandi) price for a crop.",
                Map.of(
                        "crop", param("string", "Name of the crop, e.g. wheat"),
                        "market", param("string", "City or mandi/market name"),
                        "time", param("string", "today, tomorrow, or a specific date")
                ), List.of("crop", "market")));
        tools.add(tool("get_weather",
                "Get current or forecast weather for a place.",
                Map.of(
                        "city", param("string", "City or town name"),
                        "time", param("string", "today, current, or a future date")
                ), List.of("city")));
        tools.add(tool("book_truck",
                "Book a truck for transporting goods between two locations.",
                Map.of(
                        "source", param("string", "Pickup city/town"),
                        "destination", param("string", "Drop-off city/town"),
                        "date", param("string", "Pickup date, can be relative like tomorrow")
                ), List.of("source", "destination")));
                tools.add(tool("confirm_booking",
                "Confirm and finalize a truck booking AFTER the user has already been given a quote " +
                "(via book_truck) and has now explicitly said they want to proceed, e.g. 'I want to book it', " +
                "'yes, book it', 'confirm'. Do NOT call this for the first request — call book_truck first.",
                Map.of(
                        "source", param("string", "Pickup city/town"),
                        "destination", param("string", "Drop-off city/town"),
                        "date", param("string", "Pickup date, can be relative like tomorrow")
                ), List.of("source", "destination")));
        tools.add(tool("diagnose_crop_disease",
                "Diagnose a crop/tree disease from symptoms and suggest treatment.",
                Map.of(
                        "symptoms", param("string", "Description of what's wrong with the crop/tree")
                ), List.of("symptoms")));
        tools.add(tool("get_gov_services",
                "Find matching Indian government schemes/services for a farmer's need.",
                Map.of(
                        "need", param("string", "What the farmer needs help with")
                ), List.of("need")));
        return tools;
    }

    private Map<String, Object> param(String type, String desc) {
        return Map.of("type", type, "description", desc);
    }

    private Map<String, Object> tool(String name, String desc, Map<String, Object> props, List<String> required) {
        Map<String, Object> params = new HashMap<>();
        params.put("type", "object");
        params.put("properties", props);
        params.put("required", required);
        Map<String, Object> fn = new HashMap<>();
        fn.put("name", name);
        fn.put("description", desc);
        fn.put("parameters", params);
        Map<String, Object> wrapper = new HashMap<>();
        wrapper.put("type", "function");
        wrapper.put("function", fn);
        return wrapper;
    }

    // ---------- The actual agent call: model decides what to do next ----------

    public AgentStep agentStep(List<Map<String, Object>> messages) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            Map<String, Object> body = new HashMap<>();
            body.put("model", model);
            body.put("messages", messages);
            body.put("tools", buildTools());
            body.put("tool_choice", "auto");

            Map<?, ?> response = restTemplate.postForObject(CHAT_URL, new HttpEntity<>(body, headers), Map.class);
            List<?> choices = (List<?>) response.get("choices");
            Map<?, ?> message = (Map<?, ?>) ((Map<?, ?>) choices.get(0)).get("message");

            List<?> rawToolCalls = (List<?>) message.get("tool_calls");
            String assistantMessageJson = mapper.writeValueAsString(message);

            if (rawToolCalls != null && !rawToolCalls.isEmpty()) {
                List<ToolCall> calls = new ArrayList<>();
                for (Object tc : rawToolCalls) {
                    Map<?, ?> tcMap = (Map<?, ?>) tc;
                    String id = (String) tcMap.get("id");
                    Map<?, ?> fn = (Map<?, ?>) tcMap.get("function");
                    String name = (String) fn.get("name");
                    String argsJson = (String) fn.get("arguments");
                    Map<String, Object> args = mapper.readValue(argsJson, new TypeReference<Map<String, Object>>() {});
                    calls.add(new ToolCall(id, name, args));
                }
                return new AgentStep(null, calls, assistantMessageJson);
            }

            String content = (String) message.get("content");
            return new AgentStep(content != null ? content : "Sorry, I couldn't process that.", null, assistantMessageJson);

        } catch (Exception e) {
            System.err.println("Agent step failed: " + e.getMessage());
            return new AgentStep("Sorry, I couldn't process that right now. Please try again.", null, null);
        }
    }
public String generateSeasonalWeatherEstimate(String city, String time) {
    String prompt = "Based on typical seasonal weather patterns, give a realistic weather expectation for " +
            city + " around " + time + ". Be clear this is a general seasonal estimate, not a precise forecast " +
            "(since accurate forecasts aren't possible that far ahead). " +
            "Then, based on that seasonal weather and region, suggest 3-4 crops that would be best to harvest " +
            "or sow around that time. " +
            "Reply in exactly two short sentences: first the weather estimate (mentioning expected temperature " +
            "range and general conditions like rainy/dry season), second starting with 'Good crops for this time: ' " +
            "followed by a comma-separated list of 3-4 crop names.";
    String r = callSafe(model, prompt);
    return r != null ? r.trim() : "I can't give a reliable forecast that far ahead — try checking closer to the date.";
}
    // ---------- Tool implementations (called by ChatService when the model requests them) ----------

    public String generateMandiPrice(String crop, String market, String time) {
    String prompt = "Give the current market (agricultural market/mandi) price for " + crop + " at " + market +
            (time != null ? " for " + time : "") + ". " +
            "Then, based on typical seasonal price trends for this crop, briefly advise whether now is a " +
            "good time to sell or if waiting might fetch a better price. " +
            "Reply in exactly two short sentences: first the price, e.g. " +
            "\"Wheat at Asansol market is \u20b92,180/quintal today, \u20b940 up from yesterday.\" " +
            "Second, the selling advice, starting with 'Best time to sell: '. " +
            "If the real price can't be found, give a realistic typical estimate and say clearly it's an estimate.";
    String r = callSafe(compoundModel, prompt);
    if (r == null) r = callSafe(model, prompt);
    return r != null ? r.trim() : "I couldn't find that price right now. Please try again shortly.";
}

    public String generateCropDiseaseAnswer(String symptoms) {
        String r = callSafe(model,
                "Based on these crop/tree symptoms: \"" + symptoms + "\", identify the SINGLE most probable " +
                "disease and ONE practical treatment. Format exactly: \"Likely disease: <name>. Treatment: <treatment>.\" " +
                "Keep it short.");
        return r != null ? r.trim() : "I couldn't analyze that right now. Please describe the symptoms again.";
    }

    public String generateGovServicesAnswer(String need) {
        String r = callSafe(model,
                "A farmer needs help with: \"" + need + "\". Suggest the 2 BEST-matching Indian government " +
                "services/schemes. For each, give its name and ONE short line on what it covers or its eligibility. " +
                "Be concise.");
        return r != null ? r.trim() : "I couldn't find matching services right now. Please try again.";
    }

    // ---------- Low-level Groq call (used for translation + tool implementations) ----------

    private String callSafe(String modelName, String prompt) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);
            Map<String, Object> body = Map.of("model", modelName, "messages",
                    List.of(Map.of("role", "user", "content", prompt)));
            Map<?, ?> response = restTemplate.postForObject(CHAT_URL, new HttpEntity<>(body, headers), Map.class);
            List<?> choices = (List<?>) response.get("choices");
            Map<?, ?> message = (Map<?, ?>) ((Map<?, ?>) choices.get(0)).get("message");
            return (String) message.get("content");
        } catch (Exception e) {
            System.err.println("Groq call failed [" + modelName + "]: " + e.getMessage());
            return null;
        }
    }

    private String field(String json, String name, String fallback) {
        java.util.regex.Matcher m = java.util.regex.Pattern.compile("\"" + name + "\"\\s*:\\s*\"([^\"]*)\"").matcher(json);
        return m.find() ? m.group(1) : fallback;
    }
}