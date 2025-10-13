package com.example.demo.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GithubService {

    @Value("${github.token}")
    private String githubToken;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String fetchRepositories() {
        String query = """
            {
              user(login: "Emril44") {
                pinnedItems(first: 6, types: REPOSITORY) {
                  edges {
                    node {
                      ... on Repository {
                        name
                        description
                        url
                        stargazerCount
                        primaryLanguage {
                          name
                          color
                        }
                      }
                    }
                  }
                }
              }
            }
            """;

        // wrap the query in a JSON payload
        String requestBody = String.format("{\"query\": \"%s\"}", query.replace("\"", "\\\"").replace("\n", " "));

        // set up headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(githubToken);

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        // send off POST request
        ResponseEntity<String> response = restTemplate.exchange(
                "https://api.github.com/graphql",
                HttpMethod.POST,
                entity,
                String.class
        );

        // parse and clean up the response a lil
        try {
            JsonNode root = objectMapper.readTree(response.getBody());
            JsonNode pinned = root.path("data").path("user").path("pinnedItems").path("edges");
            return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(pinned);
        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\":\"Failed to parse response\"}";
        }
    }
}