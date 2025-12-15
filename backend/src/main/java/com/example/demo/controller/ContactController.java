package com.example.demo.controller;

import com.example.demo.model.ContactMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactController {

    @PostMapping
    public ResponseEntity<?> submitContact(@RequestBody ContactMessage message) {
        // basic validation
        if(message.getName() == null || message.getName().isBlank()
        || message.getEmail() == null || message.getEmail().isBlank()
        || message.getMessage() == null || message.getMessage().isBlank()) {
            return ResponseEntity
                    .badRequest()
                    .body("All fields required!");
        }

        // mvp logging, i'll figure this out later
        System.out.println("you got mail!");
        System.out.println("Name: " + message.getName());
        System.out.println("Email: " + message.getEmail());
        System.out.println("Message: " + message.getMessage());

        return ResponseEntity.ok("Message received");
    }
}
