package com.example.demo.controller;

import com.example.demo.model.ContactMessage;
import com.example.demo.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {
    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<?> submitContact(@Valid @RequestBody ContactMessage message) {
        contactService.handle(message);

        return ResponseEntity.ok("Message received");
    }
}
