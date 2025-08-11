package com.example.backend.seeder;

import com.example.backend.entity.Task;
import com.example.backend.entity.User;
import com.example.backend.repository.TaskRepository;
import com.example.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class DbSeeder implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DbSeeder.class);

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final PasswordEncoder passwordEncoder;

    public DbSeeder(UserRepository userRepository,
                    TaskRepository taskRepository,
                    PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        try {
            seedDatabase();
        } catch (Exception e) {
            logger.error("An error occurred during database seeding", e);
        }
    }

    private void seedDatabase() {
        try {
            // Clear existing data
            logger.info("Clearing existing data...");
            taskRepository.deleteAll();
            userRepository.deleteAll();

            // Create and save users
            List<User> users = createUsers();
            userRepository.saveAll(users);
            logger.info("Created {} users", users.size());

            // Create and save tasks
            List<Task> tasks = createTasks(users);
            taskRepository.saveAll(tasks);
            logger.info("Created {} tasks", tasks.size());

            logger.info("Database seeded successfully!");
        } catch (Exception e) {
            logger.error("Failed to seed database", e);
            throw new RuntimeException("Database seeding failed", e);
        }
    }

    private List<User> createUsers() {
        try {
            User user1 = new User();
            user1.setUsername("john_doe");
            user1.setEmail("john@example.com");
            user1.setPassword(passwordEncoder.encode("password123"));
            user1.setCreatedAt(LocalDateTime.now());
            user1.setUpdatedAt(LocalDateTime.now());

            User user2 = new User();
            user2.setUsername("jane_smith");
            user2.setEmail("jane@example.com");
            user2.setPassword(passwordEncoder.encode("password123"));
            user2.setCreatedAt(LocalDateTime.now());
            user2.setUpdatedAt(LocalDateTime.now());

            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@example.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setCreatedAt(LocalDateTime.now());
            admin.setUpdatedAt(LocalDateTime.now());

            return Arrays.asList(user1, user2, admin);
        } catch (Exception e) {
            logger.error("Error creating users", e);
            throw new RuntimeException("User creation failed", e);
        }
    }

    private List<Task> createTasks(List<User> users) {
        try {
            User user1 = users.get(0);
            User user2 = users.get(1);

            Task task1 = new Task();
            task1.setTitle("Complete project documentation");
            task1.setDescription("Write detailed documentation for the new feature");
            task1.setDueDate(LocalDateTime.now().plusDays(3));
            task1.setCompleted(false);
            task1.setUser(user1);

            Task task2 = new Task();
            task2.setTitle("Review pull requests");
            task2.setDescription("Review team members' pull requests");
            task2.setDueDate(LocalDateTime.now().plusDays(1));
            task2.setCompleted(true);
            task2.setUser(user1);

            Task task3 = new Task();
            task3.setTitle("Prepare presentation");
            task3.setDescription("Create slides for the quarterly review");
            task3.setDueDate(LocalDateTime.now().plusWeeks(1));
            task3.setCompleted(false);
            task3.setUser(user1);

            Task task4 = new Task();
            task4.setTitle("Fix login bug");
            task4.setDescription("Investigate and fix the login issue on mobile");
            task4.setDueDate(LocalDateTime.now().plusDays(2));
            task4.setCompleted(false);
            task4.setUser(user2);

            Task task5 = new Task();
            task5.setTitle("Update dependencies");
            task5.setDescription("Update all project dependencies to latest versions");
            task5.setDueDate(LocalDateTime.now().plusDays(5));
            task5.setCompleted(false);
            task5.setUser(user2);

            return Arrays.asList(task1, task2, task3, task4, task5);
        } catch (Exception e) {
            logger.error("Error creating tasks", e);
            throw new RuntimeException("Task creation failed", e);
        }
    }
}