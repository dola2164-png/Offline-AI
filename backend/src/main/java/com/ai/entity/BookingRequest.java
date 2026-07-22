package com.ai.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "booking_requests")
public class BookingRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String source;

    @Column(nullable = false)
    private String destination;

    @Column(name = "travel_date", nullable = false)
    private String date;

    @Column(name = "trucks_notified_count")
    private Integer trucksNotifiedCount;

    @Column(nullable = false)
    private String status = "PENDING"; // PENDING, MATCHED, CANCELLED

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public BookingRequest() {
    }

    public BookingRequest(String source, String destination, String date, Integer trucksNotifiedCount) {
        this.source = source;
        this.destination = destination;
        this.date = date;
        this.trucksNotifiedCount = trucksNotifiedCount;
    }

    public Long getId() {
        return id;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Integer getTrucksNotifiedCount() {
        return trucksNotifiedCount;
    }

    public void setTrucksNotifiedCount(Integer trucksNotifiedCount) {
        this.trucksNotifiedCount = trucksNotifiedCount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}