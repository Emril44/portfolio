package com.example.demo.service;

import com.example.demo.model.ContactMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class ContactService {

    private final WebClient webClient;
    private final String toEmail;
    private final String fromEmail;

    public ContactService(
            @Value("${resend.api-key}") String apiKey,
            @Value("${contact.email}") String toEmail,
            @Value("${resend.from}") String fromEmail
    ) {
        this.toEmail = toEmail;
        this.fromEmail = fromEmail;

        this.webClient = WebClient.builder()
                .baseUrl("https://api.resend.com")
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .build();
    }

    @Async
    public void handle(ContactMessage message) {
        webClient.post()
                .uri("/emails")
                .bodyValue(Map.of(
                        "from", fromEmail,
                        "to", toEmail,
                        "subject", "New message from Portfolio!",
                        "text", """
                                Name: %s
                                Email: %s
                                
                                %s
                                """.formatted(
                                message.getName(),
                                message.getEmail(),
                                message.getMessage()
                        )
                ))
                .retrieve()
                .bodyToMono(Void.class)
                .block();
    }
}
