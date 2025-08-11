package com.example.backend.service;

import com.example.backend.dto.request.*;
import com.example.backend.entity.User;
import org.springframework.security.core.Authentication;

public interface UserService {
    User registerUser(RegisterRequest request);
    String authenticateUser(LoginRequest request);
    void processForgotPassword(ForgotPasswordRequest request);
    void resetPassword(ResetPasswordRequest request);
    void changePassword(String username, ChangePasswordRequest request);
    User getCurrentUser(Authentication authentication);

    User getUserByUsername(String username);
}
