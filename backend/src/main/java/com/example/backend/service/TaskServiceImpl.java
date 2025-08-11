package com.example.backend.service;

import com.example.backend.dto.request.TaskRequest;
import com.example.backend.entity.Task;
import com.example.backend.entity.User;
import com.example.backend.exception.NotFoundException;
import com.example.backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@Transactional
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public List<Task> getAllTasksForUser(User user) {
        return taskRepository.findByUserOrderByDueDateAsc(user);
    }

    @Override
    public List<Task> getTodayTasksForUser(User user) {
        LocalDateTime startOfDay = LocalDateTime.of(LocalDate.now(), LocalTime.MIN);
        LocalDateTime endOfDay = LocalDateTime.of(LocalDate.now(), LocalTime.MAX);
        return taskRepository.findByUserAndDueDateBetween(user, startOfDay, endOfDay);
    }

    @Override
    public Task createTask(User user, TaskRequest taskRequest) {
        Task task = new Task();
        task.setUser(user);
        task.setTitle(taskRequest.getTitle());
        task.setDescription(taskRequest.getDescription());
        task.setDueDate(taskRequest.getDueDate());
        task.setCompleted(taskRequest.isCompleted());
        return taskRepository.save(task);
    }

    @Override
    public Task updateTask(User user, Long taskId, TaskRequest taskRequest) {
        Task task = taskRepository.findByIdAndUser(taskId, user)
                .orElseThrow(() -> new NotFoundException("Task not found with id: " + taskId));

        task.setTitle(taskRequest.getTitle());
        task.setDescription(taskRequest.getDescription());
        task.setDueDate(taskRequest.getDueDate());
        task.setCompleted(taskRequest.isCompleted());

        return taskRepository.save(task);
    }

    @Override
    public void deleteTask(User user, Long taskId) {
        Task task = taskRepository.findByIdAndUser(taskId, user)
                .orElseThrow(() -> new NotFoundException("Task not found with id: " + taskId));
        taskRepository.delete(task);
    }
}