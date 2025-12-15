package com.example.demo.service;


import com.example.demo.model.Certification;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.List;

@Service
public class CertificationService {
    private final ObjectMapper objectMapper;

    public CertificationService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public List<Certification> getCertifications() {
        try {
            InputStream is = getClass().getResourceAsStream("/data/certifications.json");

            return objectMapper.readValue(
                    is,
                    new TypeReference<List<Certification>>() {}
            );
        } catch (Exception e) {
            throw new RuntimeException("Failed to load certifications", e);
        }
    }
}
