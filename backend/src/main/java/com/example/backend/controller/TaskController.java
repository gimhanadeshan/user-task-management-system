package com.example.backend.controller;

import com.example.backend.dto.request.TaskRequest;
import com.example.backend.dto.response.TaskResponse;
import com.example.backend.entity.Task;
import com.example.backend.entity.User;
import com.example.backend.service.TaskService;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;
    private final UserService userService;

    @Autowired
    public TaskController(TaskService taskService, UserService userService) {
        this.taskService = taskService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<TaskResponse>> getAllTasks(Authentication authentication) {
        User user = userService.getCurrentUser(authentication);
        List<Task> tasks = taskService.getAllTasksForUser(user);
        return ResponseEntity.ok(toTaskResponses(tasks));
    }

    @GetMapping("/today")
    public ResponseEntity<List<TaskResponse>> getTodayTasks(Authentication authentication) {
        User user = userService.getCurrentUser(authentication);
        List<Task> tasks = taskService.getTodayTasksForUser(user);
        return ResponseEntity.ok(toTaskResponses(tasks));
    }

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(
            @RequestBody TaskRequest taskRequest,
            Authentication authentication) {
        User user = userService.getCurrentUser(authentication);
        Task task = taskService.createTask(user, taskRequest);
        return ResponseEntity.ok(toTaskResponse(task));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> updateTask(
            @PathVariable Long id,
            @RequestBody TaskRequest taskRequest,
            Authentication authentication) {
        User user = userService.getCurrentUser(authentication);
        Task task = taskService.updateTask(user, id, taskRequest);
        return ResponseEntity.ok(toTaskResponse(task));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(
            @PathVariable Long id,
            Authentication authentication) {
        User user = userService.getCurrentUser(authentication);
        taskService.deleteTask(user, id);
        return ResponseEntity.noContent().build();
    }

    // Helper methods
    private TaskResponse toTaskResponse(Task task) {
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getDueDate(),
                task.isCompleted(),
                task.getUser().getId()
        );
    }

    private List<TaskResponse> toTaskResponses(List<Task> tasks) {
        return tasks.stream()
                .map(this::toTaskResponse)
                .collect(Collectors.toList());
    }
}