package com.dto;

import java.util.List;

public class ChatRequest {
    public List<ChatMessage> history;
    public String audioBase64;
    public String audioMimeType;
    public String language;
}