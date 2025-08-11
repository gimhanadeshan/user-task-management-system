package com.example.backend.service.impl;

import com.example.backend.service.MailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class MailServiceImpl implements MailService {

    private final JavaMailSender mailSender;
    private final Environment env;
    private final TemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public MailServiceImpl(JavaMailSender mailSender,
                           Environment env,
                           TemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.env = env;
        this.templateEngine = templateEngine;
    }


    @Override
    public void sendResetPasswordEmail(String toEmail, String resetToken) throws MessagingException {
        String appUrl = env.getProperty("app.base-url", "http://localhost:8080");
        String resetUrl = appUrl + "/reset-password?token=" + resetToken;

        Context context = new Context();
        context.setVariable("resetUrl", resetUrl);

        String content = templateEngine.process("email/reset-password", context);

        sendEmail(toEmail, "Password Reset Request", content);
    }

    @Override
    public void sendEmail(String toEmail, String subject, String content) throws MessagingException {
        var message = mailSender.createMimeMessage();
        var helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(fromEmail);
        helper.setTo(toEmail);
        helper.setSubject(subject);
        helper.setText(content, true);

        mailSender.send(message);
    }
}