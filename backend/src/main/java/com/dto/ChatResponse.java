package com.dto;

public class ChatResponse {
    public String reply;
    public String language;
    public String queryType;
    public boolean needsMoreInfo;
    public String audioBase64;

    public ChatResponse() {}

    public ChatResponse(String reply, String language, String queryType, boolean needsMoreInfo) {
        this.reply = reply;
        this.language = language;
        this.queryType = queryType;
        this.needsMoreInfo = needsMoreInfo;
    }
}