package com.flextime.service;

import com.flextime.domain.dto.CheckinCreateDTO;
import com.flextime.domain.dto.CheckinResponseDTO;
import com.flextime.domain.dto.CheckinUpdateDTO;
import com.flextime.domain.model.Checkin;
import com.flextime.domain.model.User;
import com.flextime.domain.repository.CheckinRepository;
import com.flextime.domain.repository.UserRepository;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
public class CheckinService {

    private final CheckinRepository checkinRepository;
    private final UserRepository userRepository;

    public CheckinService(CheckinRepository checkinRepository,
                          UserRepository userRepository
                          ) {
        this.checkinRepository = checkinRepository;
        this.userRepository = userRepository;

    }

    @Transactional
    public CheckinResponseDTO create(CheckinCreateDTO dto) {

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        Checkin checkin = new Checkin();
        checkin.setUser(user);
        checkin.setDate(dto.getDate());
        checkin.setLocationType(dto.getLocationType());
        checkin.setMood(dto.getMood());


        Checkin saved = checkinRepository.save(checkin);

        CheckinResponseDTO response = new CheckinResponseDTO();
        response.setId(saved.getId());
        response.setUserId(saved.getUser().getId());
        response.setDate(saved.getDate());
        response.setLocationType(saved.getLocationType());
        response.setMood(saved.getMood());

        return response;
    }

    public Page<CheckinResponseDTO> listByUser(Long userId, Pageable pageable) {

        Page<Checkin> page = checkinRepository.findByUserId(userId, pageable);

        var dtoList = page.getContent()
                .stream()
                .map(checkin -> {
                    CheckinResponseDTO dto = new CheckinResponseDTO();
                    dto.setId(checkin.getId());
                    dto.setUserId(checkin.getUser().getId());
                    dto.setDate(checkin.getDate());
                    dto.setLocationType(checkin.getLocationType());
                    dto.setMood(checkin.getMood());
                    return dto;
                })
                .collect(Collectors.toList());

        return new PageImpl<>(dtoList, pageable, page.getTotalElements());
    }

    @Transactional
    public CheckinResponseDTO update(Long id, CheckinUpdateDTO dto) {

        Checkin checkin = checkinRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Check-in não encontrado"));

        checkin.setDate(dto.getDate());
        checkin.setLocationType(dto.getLocationType());
        checkin.setMood(dto.getMood());

        Checkin updated = checkinRepository.save(checkin);

        CheckinResponseDTO response = new CheckinResponseDTO();
        response.setId(updated.getId());
        response.setUserId(updated.getUser().getId());
        response.setDate(updated.getDate());
        response.setLocationType(updated.getLocationType());
        response.setMood(updated.getMood());

        return response;
    }

    @Transactional
    public void delete(Long id) {

        Checkin checkin = checkinRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Check-in não encontrado"));

        checkinRepository.delete(checkin);
    }
}
