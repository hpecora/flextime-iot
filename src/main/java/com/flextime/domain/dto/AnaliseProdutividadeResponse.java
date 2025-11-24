package com.flextime.domain.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class AnaliseProdutividadeResponse {

    private Long id;
    private Long userId;
    private LocalDate periodoInicio;
    private LocalDate periodoFim;
    private Integer scoreEquilibrio;
    private String resumoTexto;
    private LocalDateTime criadoEm;

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
