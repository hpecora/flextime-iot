package com.flextime.domain.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "CHECKIN")
public class Checkin {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "checkin_seq")
    @SequenceGenerator(name = "checkin_seq", sequenceName = "CHECKIN_SEQ", allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "USER_ID", nullable = false)
    private User user;

    @Column(name = "CHECKIN_DATE", nullable = false)
    private LocalDate date;

    @Column(name = "LOCATION_TYPE", nullable = false, length = 50)
    private String locationType;

    @Column(name = "MOOD", nullable = false)
    private Integer mood;

    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;

    // getters e setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getLocationType() {
        return locationType;
    }

    public void setLocationType(String locationType) {
        this.locationType = locationType;
    }

    public Integer getMood() {
        return mood;
    }

    public void setMood(Integer mood) {
        this.mood = mood;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
