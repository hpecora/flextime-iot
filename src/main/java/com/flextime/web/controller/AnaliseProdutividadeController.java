package com.flextime.web.controller;

import com.flextime.domain.dto.AnaliseProdutividadeResponse;
import com.flextime.domain.dto.GerarAnaliseRequest;
import com.flextime.service.AnaliseProdutividadeService;
import jakarta.validation.Valid;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/reports")
public class AnaliseProdutividadeController {

    private final AnaliseProdutividadeService service;

    public AnaliseProdutividadeController(AnaliseProdutividadeService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<AnaliseProdutividadeResponse> gerar(
            @Valid @RequestBody GerarAnaliseRequest request
    ) {
        AnaliseProdutividadeResponse resp = service.gerarAnalise(request);
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<AnaliseProdutividadeResponse>> listarPorUsuario(
            @PathVariable Long userId,
            Pageable pageable
    ) {
        return ResponseEntity.ok(service.listarPorUsuario(userId, pageable));
    }

    @GetMapping("/user/{userId}/last")
    @Cacheable(value = "lastReport", key = "#userId")
    public ResponseEntity<AnaliseProdutividadeResponse> buscarUltima(
            @PathVariable Long userId
    ) {
        return ResponseEntity.ok(service.buscarUltima(userId));
    }
}
