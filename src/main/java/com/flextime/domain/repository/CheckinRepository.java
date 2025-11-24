package com.flextime.domain.repository;

import com.flextime.domain.model.Checkin;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface CheckinRepository extends JpaRepository<Checkin, Long> {

    Page<Checkin> findByUserId(Long userId, Pageable pageable);

    List<Checkin> findByUserIdAndDateBetween(
            Long userId,
            LocalDate inicio,
            LocalDate fim
    );
}
