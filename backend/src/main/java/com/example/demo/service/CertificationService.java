package com.example.demo.service;


import com.example.demo.model.Certification;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.List;

@Service
public class CertificationService {
    private final ObjectMapper objectMapper;

    @Value("${app.base-url}")
    private String baseUrl;

    public CertificationService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public List<Certification> getCertifications() {
        try {
            InputStream is = getClass().getResourceAsStream("/data/certifications.json");

            List<Certification> certs = objectMapper.readValue(
                    is,
                    new TypeReference<List<Certification>>() {}
            );

            certs.forEach(cert ->
                    cert.setFileUrl(baseUrl + cert.getFileUrl())
            );

            return certs;
        } catch (Exception e) {
            throw new RuntimeException("Failed to load certifications", e);
        }
    }
}
