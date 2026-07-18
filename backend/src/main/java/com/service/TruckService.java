package com.service;

import org.springframework.stereotype.Service;

@Service
public class TruckService {

    public String getBookingResponse(String source, String destination, String date) {
        return "Available: offline-ai-truck at ₹20/km for your route from " + source + " to " + destination +
                " on " + date + ". " +
                "Please wait up to 24 hours — we have sent your request to other registered trucks as well to find you the best price.";
    }
}