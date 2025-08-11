package com.example.backend.service;

import jakarta.mail.MessagingException;

public interface MailService {
    void sendResetPasswordEmail(String toEmail, String resetToken) throws MessagingException;
    void sendEmail(String toEmail, String subject, String content) throws MessagingException;
}
