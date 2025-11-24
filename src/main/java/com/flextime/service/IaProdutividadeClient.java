package com.flextime.service;

import com.flextime.domain.model.Checkin;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class IaProdutividadeClient {

    public String gerarResumo(
            Long userId,
            LocalDate inicio,
            LocalDate fim,
            double mediaHumor,
            int scoreEquilibrio,
            List<Checkin> checkins
    ) {

        int totalCheckins = checkins.size();
        long homeCount = checkins.stream()
                .filter(c -> "HOME".equalsIgnoreCase(c.getLocationType()))
                .count();
        long officeCount = checkins.stream()
                .filter(c -> "OFFICE".equalsIgnoreCase(c.getLocationType()))
                .count();
        long remoteCount = checkins.stream()
                .filter(c -> "REMOTE".equalsIgnoreCase(c.getLocationType()))
                .count();

        return String.format(
                "Entre %s e %s, você registrou %d check-ins: %d em home office, %d no escritório e %d em trabalho remoto. " +
                        "Sua média de humor foi %.1f, resultando em um score de equilíbrio de %d. " +
                        "Mantenha os hábitos que contribuem para um bom humor e, nos dias em que a nota caiu, " +
                        "reorganize pausas e horários de foco para preservar seu bem-estar.",
                inicio,
                fim,
                totalCheckins,
                homeCount,
                officeCount,
                remoteCount,
                mediaHumor,
                scoreEquilibrio
        );
    }
}
