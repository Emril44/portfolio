package com.example.demo.service;

import com.example.demo.model.ContactMessage;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContactService {
    private final List<ContactMessage> messages = new ArrayList<>();

    public void save(ContactMessage message) {
        messages.add(message);
    }

    public List<ContactMessage> getAll() {
        return messages;
    }
}
