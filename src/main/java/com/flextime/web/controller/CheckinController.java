package com.flextime.web.controller;

import com.flextime.domain.dto.CheckinCreateDTO;
import com.flextime.domain.dto.CheckinResponseDTO;
import com.flextime.domain.dto.CheckinUpdateDTO;
import com.flextime.service.CheckinService;
import jakarta.validation.Valid;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/checkins")
public class CheckinController {

    private final CheckinService checkinService;

    public CheckinController(CheckinService checkinService) {
        this.checkinService = checkinService;
    }

    @PostMapping
    public ResponseEntity<CheckinResponseDTO> create(
            @Valid @RequestBody CheckinCreateDTO dto
    ) {
        return ResponseEntity.status(201).body(checkinService.create(dto));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<CheckinResponseDTO>> listByUser(
            @PathVariable Long userId,
            Pageable pageable
    ) {
        return ResponseEntity.ok(checkinService.listByUser(userId, pageable));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CheckinResponseDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody CheckinUpdateDTO dto
    ) {
        return ResponseEntity.ok(checkinService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        checkinService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
