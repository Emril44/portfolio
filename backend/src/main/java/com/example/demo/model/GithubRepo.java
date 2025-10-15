package com.example.demo.model;

public class GithubRepo {
    private String name;
    private String description;
    private String url;
    private int stargazerCount;
    private String languageName;
    private String languageColor;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public int getStargazerCount() {
        return stargazerCount;
    }

    public void setStargazerCount(int stargazerCount) {
        this.stargazerCount = stargazerCount;
    }

    public String getLanguageName() {
        return languageName;
    }

    public void setLanguageName(String languageName) {
        this.languageName = languageName;
    }

    public String getLanguageColor() {
        return languageColor;
    }

    public void setLanguageColor(String languageColor) {
        this.languageColor = languageColor;
    }

}
