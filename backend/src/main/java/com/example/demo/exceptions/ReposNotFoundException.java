package com.example.demo.exceptions;

public class ReposNotFoundException extends RuntimeException {
    public ReposNotFoundException(String message) {
        super(message);
    }

    public ReposNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
