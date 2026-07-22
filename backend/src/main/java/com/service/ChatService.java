package com.service;

import com.dto.ChatMessage;
import com.dto.ChatRequest;
import com.dto.ChatResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import java.util.*;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private static final int MAX_AGENT_STEPS = 4;

    private static final String SYSTEM_PROMPT =
    "You are a support assistant for farmers. You can help ONLY with: market/mandi prices, weather, " +
    "truck booking, government services, and crop disease diagnosis. " +
    "Use the available tools whenever you have enough information to call them. " +
    "If required details are missing (like a city, crop name, or date), ask the user ONE short " +
    "clarifying question instead of calling a tool. " +
    "IMPORTANT: After a tool returns a result, your reply to the user MUST include the actual result " +
    "(the real price, weather data, or booking details) — do NOT just say thank you or acknowledge " +
    "that something was done without stating what it is. " +
    "If the user's message is unrelated to these five topics, politely say you can only help with " +
    "market prices, weather, truck booking, government services, and crop disease detection & treatment. " +
    "Always reply in English; translation to the user's language is handled separately.";

    private final AIService ai;
    private final WeatherService weather;
    private final TruckService truck;
    private final SarvamService sarvam;
    private final ObjectMapper mapper = new ObjectMapper();

    public ChatService(AIService ai, WeatherService weather, TruckService truck, SarvamService sarvam) {
        this.ai = ai;
        this.weather = weather;
        this.truck = truck;
        this.sarvam = sarvam;
    }

    public ChatResponse processUserChat(ChatRequest req) {
        String lang = req.language != null ? req.language : "English";
        boolean isVoice = req.audioBase64 != null && !req.audioBase64.isBlank();

        try {
            String latestEnglish;

            if (isVoice) {
                var ti = ai.transcribeAndTranslateAudio(req.audioBase64, req.audioMimeType);
                if (ti == null || ti.englishText() == null) return fallback(lang, isVoice);
                latestEnglish = ti.englishText();
            } else {
                String latest = lastUserMessage(req.history);
                if (latest == null || latest.isBlank()) return fallback(lang, isVoice);
                var ti = ai.translateToEnglish(latest);
                if (ti == null || ti.englishText() == null) return fallback(lang, isVoice);
                latestEnglish = ti.englishText();
            }

            List<Map<String, Object>> messages = buildMessages(req.history, latestEnglish, isVoice);

            String finalText = null;
            String lastToolUsed = "general";

            for (int step = 0; step < MAX_AGENT_STEPS; step++) {
    AIService.AgentStep result = ai.agentStep(messages);

    if (result.toolCalls() == null) {
        finalText = result.finalText();
        break;
    }

    Map<String, Object> assistantMsg = mapper.readValue(
            result.rawAssistantMessageJson(), new TypeReference<Map<String, Object>>() {});
    messages.add(assistantMsg);

    String truckResultText = null;

    for (AIService.ToolCall call : result.toolCalls()) {
        lastToolUsed = call.name();
        String toolResult = runTool(call);

      if (call.name().equals("book_truck") || call.name().equals("confirm_booking")) {
            truckResultText = toolResult;
        }

        Map<String, Object> toolMsg = new HashMap<>();
        toolMsg.put("role", "tool");
        toolMsg.put("tool_call_id", call.id());
        toolMsg.put("content", toolResult);
        messages.add(toolMsg);
    }

    if (truckResultText != null) {
        finalText = truckResultText;
        break;
    }
}

            if (finalText == null) finalText = "Sorry, I couldn't finish processing that. Please try again.";

            boolean needsMoreInfo = lastToolUsed.equals("general") && messages.size() <= 2;
            String translated = ai.translateFromEnglish(finalText, lang);
            return respond(translated, lang, lastToolUsed, needsMoreInfo, isVoice);

        } catch (Exception e) {
            System.err.println("Chat processing failed: " + e.getMessage());
            return fallback(lang, isVoice);
        }
    }

    // Executes the tool the model asked for, using its own extracted arguments.
    private String runTool(AIService.ToolCall call) {
    System.out.println(">>> TOOL CALLED: " + call.name() + " with args: " + call.arguments()); 
    try {
        Map<String, Object> a = call.arguments();
        return switch (call.name()) {
            case "get_mandi_price" -> ai.generateMandiPrice(
                    str(a, "crop"), str(a, "market"), str(a, "time"));
            case "get_weather" -> {
    String time = str(a, "time");
    boolean isCurrent = time == null || time.toLowerCase().contains("today")
            || time.toLowerCase().contains("current") || time.toLowerCase().contains("now");
    yield isCurrent
            ? weather.getWeather(str(a, "city"))
            : ai.generateSeasonalWeatherEstimate(str(a, "city"), time);
}
            case "book_truck" -> truck.getBookingResponse(
                    str(a, "source"), str(a, "destination"),
                    a.get("date") != null ? str(a, "date") : "tomorrow");
            case "confirm_booking" -> truck.confirmBooking(
                    str(a, "source"), str(a, "destination"),
                    a.get("date") != null ? str(a, "date") : "tomorrow");
            case "get_gov_services" -> ai.generateGovServicesAnswer(str(a, "need"));
            default -> "Unknown tool: " + call.name();
        };
    } catch (Exception e) {
        return "Tool execution failed: " + e.getMessage();
    }
}

    private String str(Map<String, Object> args, String key) {
        Object v = args.get(key);
        return v != null ? v.toString() : null;
    }

    private List<Map<String, Object>> buildMessages(List<ChatMessage> history, String latestEnglish, boolean isVoice) {
        List<Map<String, Object>> messages = new ArrayList<>();
        messages.add(Map.of("role", "system", "content", SYSTEM_PROMPT));

        if (history != null) {
            int limit = isVoice ? history.size() : history.size() - 1;
            for (int i = 0; i < limit; i++) {
                ChatMessage m = history.get(i);
                messages.add(Map.of("role", m.role.equalsIgnoreCase("user") ? "user" : "assistant", "content", m.content));
            }
        }
        messages.add(Map.of("role", "user", "content", latestEnglish));
        return messages;
    }

    private String lastUserMessage(List<ChatMessage> history) {
        if (history == null) return null;
        for (int i = history.size() - 1; i >= 0; i--)
            if ("user".equalsIgnoreCase(history.get(i).role)) return history.get(i).content;
        return null;
    }

    private ChatResponse respond(String text, String lang, String intent, boolean needsMoreInfo, boolean isVoice) {
        ChatResponse r = new ChatResponse(text, lang, intent, needsMoreInfo);
        if (isVoice) r.audioBase64 = sarvam.textToSpeechBase64(text, sarvam.toLanguageCode(lang));
        return r;
    }

    private ChatResponse fallback(String lang, boolean isVoice) {
        return respond("Sorry, I couldn't process that. Please try again.", lang, "general", true, isVoice);
    }
}
