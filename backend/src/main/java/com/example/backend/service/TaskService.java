package com.example.backend.service;

import com.example.backend.dto.request.TaskRequest;
import com.example.backend.entity.Task;
import com.example.backend.entity.User;

import java.util.List;

public interface TaskService {
    List<Task> getAllTasksForUser(User user);
    List<Task> getTodayTasksForUser(User user);
    Task createTask(User user, TaskRequest taskRequest);
    Task updateTask(User user, Long taskId, TaskRequest taskRequest);
    void deleteTask(User user, Long taskId);
}