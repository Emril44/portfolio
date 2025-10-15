package com.example.demo.service;

import com.example.demo.exceptions.ReposNotFoundException;
import com.example.demo.model.GithubRepo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class GithubService {

    private static final Logger logger = LoggerFactory.getLogger(GithubService.class);

    @Value("${github.token}")
    private String githubToken;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<GithubRepo> fetchRepositories() {
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


        // parse and clean up the response a lil
        try {
            // send off POST request
            ResponseEntity<String> response = restTemplate.exchange(
                    "https://api.github.com/graphql",
                    HttpMethod.POST,
                    entity,
                    String.class
            );

            // parse response
            JsonNode root = objectMapper.readTree(response.getBody());
            JsonNode pinned = root.path("data").path("user").path("pinnedItems").path("edges");

            // convert to GithubRepo model
            List<GithubRepo> repos = new ArrayList<>();
            for (JsonNode edge : pinned) {
                JsonNode node = edge.path("node");
                GithubRepo repo = new GithubRepo();

                repo.setName(node.path("name").asText());
                repo.setDescription(node.path("description").isNull() ? null : node.path("description").asText());
                repo.setUrl(node.path("url").asText());
                repo.setStargazerCount(node.path("stargazerCount").asInt());

                JsonNode lang = node.path("primaryLanguage");
                if(!lang.isMissingNode() && !lang.isNull()) {
                    repo.setLanguageName(lang.path("name").asText());
                    repo.setLanguageColor(lang.path("color").asText());
                }

                repos.add(repo);
            }

            return repos;
        } catch (ReposNotFoundException e) {
            logger.error("Failed to fetch repositories from GitHub: ", e);
            throw new ReposNotFoundException("Unable to fetch repositories", e);
        } catch (JsonMappingException e) {
            throw new RuntimeException("Unable to map to JSON", e);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Unable to process JSON", e);
        }
    }
}