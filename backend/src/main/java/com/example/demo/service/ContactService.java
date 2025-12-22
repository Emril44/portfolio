package com.example.demo.service;

import com.example.demo.model.ContactMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;


@Service
public class ContactService {
    private final JavaMailSender mailSender;
    @Value("${contact.email}")
    private String myEmail;

        public ContactService(JavaMailSender mailSender, @Value("${contact.email}") String myEmail) {
        this.mailSender = mailSender;
        this.myEmail = myEmail;
    }

    @Async
    public void handle(ContactMessage message) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(myEmail);
        mail.setSubject("New message from Portfolio!");
        mail.setText("""
                Name: %s
                Email: %s
                
                %s
                """.formatted(
                        message.getName(),
                        message.getEmail(),
                        message.getMessage()
        ));

        mailSender.send(mail);
    }
}
