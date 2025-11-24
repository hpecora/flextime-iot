package com.flextime.domain.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "analises_produtividade")
public class AnaliseProdutividade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private LocalDate periodoInicio;

    @Column(nullable = false)
    private LocalDate periodoFim;

    @Column(nullable = false)
    private Integer scoreEquilibrio;   // 0–100

    @Column(nullable = false, length = 4000)
    private String resumoTexto;

    @Column(nullable = false)
    private LocalDateTime criadoEm = LocalDateTime.now();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDate getPeriodoInicio() {
        return periodoInicio;
    }

    public void setPeriodoInicio(LocalDate periodoInicio) {
        this.periodoInicio = periodoInicio;
    }

    public LocalDate getPeriodoFim() {
        return periodoFim;
    }

    public void setPeriodoFim(LocalDate periodoFim) {
        this.periodoFim = periodoFim;
    }

    public Integer getScoreEquilibrio() {
        return scoreEquilibrio;
    }

    public void setScoreEquilibrio(Integer scoreEquilibrio) {
        this.scoreEquilibrio = scoreEquilibrio;
    }

    public String getResumoTexto() {
        return resumoTexto;
    }

    public void setResumoTexto(String resumoTexto) {
        this.resumoTexto = resumoTexto;
    }

    public LocalDateTime getCriadoEm() {
        return criadoEm;
    }

    public void setCriadoEm(LocalDateTime criadoEm) {
        this.criadoEm = criadoEm;
    }
}
