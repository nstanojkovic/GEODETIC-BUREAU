package com.example.demo.entity;

public enum Status {
    NIJE_ZAVRSEN("nije zavrsen"),
    ZAVRSEN("zavrsen");

    private final String value;

    Status(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return value;
    }
}
