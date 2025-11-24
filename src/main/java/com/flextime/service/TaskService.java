package com.flextime.service;

import com.flextime.domain.dto.*;
import com.flextime.domain.model.Task;
import com.flextime.domain.model.User;
import com.flextime.domain.repository.TaskRepository;
import com.flextime.domain.repository.UserRepository;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository,
                       UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public TaskResponseDTO create(TaskCreateDTO dto) {

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        Task task = new Task();
        task.setUser(user);
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setStatus(dto.getStatus());
        task.setDueDate(dto.getDueDate());

        Task saved = taskRepository.save(task);

        TaskResponseDTO response = new TaskResponseDTO();
        response.setId(saved.getId());
        response.setUserId(saved.getUser().getId());
        response.setTitle(saved.getTitle());
        response.setDescription(saved.getDescription());
        response.setStatus(saved.getStatus());
        response.setDueDate(saved.getDueDate());
        response.setCreatedAt(saved.getCreatedAt());

        return response;
    }

    public Page<TaskResponseDTO> listByUser(Long userId, Pageable pageable) {

        Page<Task> page = taskRepository.findByUserId(userId, pageable);

        var dtoList = page.getContent()
                .stream()
                .map(task -> {
                    TaskResponseDTO dto = new TaskResponseDTO();
                    dto.setId(task.getId());
                    dto.setUserId(task.getUser().getId());
                    dto.setTitle(task.getTitle());
                    dto.setDescription(task.getDescription());
                    dto.setStatus(task.getStatus());
                    dto.setDueDate(task.getDueDate());
                    dto.setCreatedAt(task.getCreatedAt());
                    return dto;
                })
                .collect(Collectors.toList());

        return new PageImpl<>(dtoList, pageable, page.getTotalElements());
    }

    @Transactional
    public TaskResponseDTO update(Long id, TaskUpdateDTO dto) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Task não encontrada"));

        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setStatus(dto.getStatus());
        task.setDueDate(dto.getDueDate());

        Task updated = taskRepository.save(task);

        TaskResponseDTO response = new TaskResponseDTO();
        response.setId(updated.getId());
        response.setUserId(updated.getUser().getId());
        response.setTitle(updated.getTitle());
        response.setDescription(updated.getDescription());
        response.setStatus(updated.getStatus());
        response.setDueDate(updated.getDueDate());
        response.setCreatedAt(updated.getCreatedAt());

        return response;
    }

    @Transactional
    public void delete(Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Task não encontrada"));

        taskRepository.delete(task);
    }

    public Page<TaskResponseDTO> findByUser(Long userId, Pageable pageable) {

        Page<Task> page = taskRepository.findByUserId(userId, pageable);

        var dtoList = page.getContent()
                .stream()
                .map(task -> {
                    TaskResponseDTO dto = new TaskResponseDTO();
                    dto.setId(task.getId());
                    dto.setUserId(task.getUser().getId());
                    dto.setTitle(task.getTitle());
                    dto.setDescription(task.getDescription());
                    dto.setStatus(task.getStatus());
                    dto.setDueDate(task.getDueDate());
                    return dto;
                })
                .collect(Collectors.toList());

        return new PageImpl<>(dtoList, pageable, page.getTotalElements());
    }


}
