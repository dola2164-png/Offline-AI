package com.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.Map;

@Service
public class SarvamService {

    private final RestTemplate restTemplate;

    @Value("${sarvam.api-key}")
    private String apiKey;

    @Value("${sarvam.speaker:anushka}")
    private String speaker;

    @Value("${sarvam.model:bulbul:v2}")
    private String ttsModel;

    private static final String TTS_URL = "https://api.sarvam.ai/text-to-speech";

    public SarvamService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String textToSpeechBase64(String text, String languageCode) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("api-subscription-key", apiKey);
            Map<String, Object> body = Map.of(
                    "inputs", List.of(text),
                    "target_language_code", languageCode,
                    "speaker", speaker,
                    "model", ttsModel);
            Map<?, ?> response = restTemplate.postForObject(TTS_URL, new HttpEntity<>(body, headers), Map.class);
            List<?> audios = (List<?>) response.get("audios");
            return (audios == null || audios.isEmpty()) ? null : (String) audios.get(0);
        } catch (Exception e) {
            System.err.println("Sarvam TTS failed: " + e.getMessage());
            return null;
        }
    }

    public String toLanguageCode(String languageName) {
        if (languageName == null) return "en-IN";
        return switch (languageName.trim().toLowerCase()) {
            case "hindi" -> "hi-IN";
            case "bengali" -> "bn-IN";
            case "tamil" -> "ta-IN";
            case "telugu" -> "te-IN";
            case "marathi" -> "mr-IN";
            case "gujarati" -> "gu-IN";
            case "punjabi" -> "pa-IN";
            case "kannada" -> "kn-IN";
            case "malayalam" -> "ml-IN";
            case "odia" -> "od-IN";
            default -> "en-IN";
        };
    }
}