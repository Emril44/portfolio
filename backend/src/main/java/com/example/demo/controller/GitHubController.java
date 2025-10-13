package com.example.demo.controller;

import com.example.demo.service.GithubService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/github")
@CrossOrigin(origins = "http://localhost:3000") // open frontend
public class GitHubController {
    private final GithubService githubService;

    public GitHubController(GithubService githubService) {
        this.githubService = githubService;
    }

    @GetMapping("/repos")
    public ResponseEntity<String> getRepos() {
        return ResponseEntity.ok(githubService.fetchRepositories());
    }
}
