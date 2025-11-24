package com.flextime.domain.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class GerarAnaliseRequest {

    @NotNull
    private Long userId;

    @NotNull
    private LocalDate periodoInicio;

    @NotNull
    private LocalDate periodoFim;

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
}
