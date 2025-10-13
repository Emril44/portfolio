package com.example.demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class GithubService {
    private static final String GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

    @Value("${github.token}")
    private String gitHubToken;

    private final RestTemplate restTemplate = new RestTemplate();

    public String fetchRepositories() {
        String query = """
            {
              viewer {
                repositories(first: 5, orderBy: {field: UPDATED_AT, direction: DESC}) {
                  nodes {
                    name
                    url
                    description
                    stargazerCount
                  }
                }
              }
            }
            """;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(gitHubToken);

        Map<String, String> body = Map.of("query", query);

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(body,headers);

        ResponseEntity<String> response = restTemplate.exchange(
                GITHUB_GRAPHQL_URL,
                HttpMethod.POST,
                entity,
                String.class
        );

        return response.getBody();
    }
}
