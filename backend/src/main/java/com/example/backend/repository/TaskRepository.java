package com.example.backend.repository;

import com.example.backend.entity.Task;
import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserOrderByDueDateAsc(User user);
    List<Task> findByUserAndDueDateBetween(User user, LocalDateTime start, LocalDateTime end);
    Optional<Task> findByIdAndUser(Long id, User user);
}