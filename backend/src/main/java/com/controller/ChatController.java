package com.controller;

import com.dto.ChatRequest;
import com.dto.ChatResponse;
import com.service.ChatService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ChatController {

    private final ChatService chatService;
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }
    @PostMapping("/chat")
    public ChatResponse chat(@RequestBody ChatRequest request) {
        return chatService.processUserChat(request);
    }
    @PostMapping("/voice")
    public ChatResponse voice(@RequestBody ChatRequest request) {
        return chatService.processUserChat(request);
    }
}