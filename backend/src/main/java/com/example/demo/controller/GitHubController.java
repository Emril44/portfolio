package com.example.demo.controller;

import com.example.demo.model.GithubRepo;
import com.example.demo.service.GithubService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/github")
@CrossOrigin(origins = "http://localhost:3000") // open frontend
public class GitHubController {
    private final GithubService githubService;

    public GitHubController(GithubService githubService) {
        this.githubService = githubService;
    }

    @GetMapping("/repos")
    public ResponseEntity<List<GithubRepo>> getRepos() {
        return ResponseEntity.ok(githubService.fetchRepositories());
    }
}
