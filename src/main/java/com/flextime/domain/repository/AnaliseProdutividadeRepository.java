package com.flextime.domain.repository;

import com.flextime.domain.model.AnaliseProdutividade;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AnaliseProdutividadeRepository extends JpaRepository<AnaliseProdutividade, Long> {

    Page<AnaliseProdutividade> findByUserId(Long userId, Pageable pageable);

    Optional<AnaliseProdutividade> findFirstByUserIdOrderByCriadoEmDesc(Long userId);
}
