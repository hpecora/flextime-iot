package com.flextime.web.controller;

import com.flextime.domain.dto.*;
import com.flextime.service.TaskService;
import org.springframework.data.domain.*;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public ResponseEntity<TaskResponseDTO> create(@RequestBody TaskCreateDTO dto) {
        return ResponseEntity.status(201).body(taskService.create(dto));
    }

    @GetMapping("/user/{userId}")
    public Page<TaskResponseDTO> findByUser(
            @PathVariable Long userId,
            @PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {

        return taskService.findByUser(userId, pageable);
    }


    @PutMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> update(
            @PathVariable Long id,
            @RequestBody TaskUpdateDTO dto
    ) {
        return ResponseEntity.ok(taskService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        taskService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
