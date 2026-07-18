package com.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Map;

@Service
public class WeatherService {

    private final RestTemplate restTemplate;

    @Value("${weather.api-key}")
    private String apiKey;

    @Value("${weather.base-url:https://api.openweathermap.org/data/2.5}")
    private String baseUrl;

    public WeatherService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getWeather(String city) {
        if (city == null || city.isBlank() || city.equalsIgnoreCase("unknown"))
            return "I couldn't figure out which city you meant. Please mention a city name.";
        try {
            return fetchWeather(city);
        } catch (Exception e) {
            return "Sorry, I couldn't fetch the weather for " + city + " right now.";
        }
    }

    @SuppressWarnings("unchecked")
    private String fetchWeather(String city) {
        Map<String, Object> r = restTemplate.getForObject(
                baseUrl + "/weather?q=" + city + "&units=metric&appid=" + apiKey, Map.class);
        double temp = ((Number) ((Map<String, Object>) r.get("main")).get("temp")).doubleValue();
        double wind = ((Number) ((Map<String, Object>) r.get("wind")).get("speed")).doubleValue();
        String cond = (String) ((java.util.List<Map<String, Object>>) r.get("weather")).get(0).get("description");
        return "The current weather in " + city + " is " + cond + ", with a temperature of " + temp + "°C and wind speed of " + wind + " km/h.";
    }
}