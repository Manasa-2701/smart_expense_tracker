package com.expensetracker.service;

import com.expensetracker.model.RecurrentExpense;
import com.expensetracker.model.User;
import com.expensetracker.repository.RecurrentExpenseRepository;
import com.expensetracker.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private RecurrentExpenseRepository expenseRepository;

    @Autowired
    private UserRepository userRepository; // Added UserRepository to fetch user details by userId

    @Transactional
    @Scheduled(cron = "0 7 9 2 * ?") // Runs at 5:50 AM on the 2nd of every month
    // Runs at 9 AM on the 1st of every month
    public void sendMonthlyReminders() {
        List<RecurrentExpense> expenses = expenseRepository.findByRecurrenceType("Monthly");
        sendReminders(expenses);
    }

    @Transactional
    @Scheduled(cron = "0 0 9 1 1 ?") // Runs at 9 AM on January 1st every year
    public void sendYearlyReminders() {
        List<RecurrentExpense> expenses = expenseRepository.findByRecurrenceType("Yearly");
        sendReminders(expenses);
    }


    private void sendReminders(List<RecurrentExpense> expenses) {
        for (RecurrentExpense expense : expenses) {
            try {
                // Convert String userId to Long
                Long userId = Long.parseLong(expense.getUserId());  // or use Long.valueOf() as needed
                
                // Now use userId to get the user's email and send the reminder
                String userEmail = getUserEmail(userId);
                sendEmail(userEmail, expense.getExpenseName(), expense.getAmount());
            } catch (NumberFormatException e) {
                // Handle invalid String to Long conversion
                System.out.println("Invalid userId format for expense: " + expense.getId());
            }
        }
    }
    
    private String getUserEmail(Long userId) {
        // Retrieve the user by ID to get their email
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return user.getEmail();
    }
    
    private void sendEmail(String email, String expenseName, Double amount) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Reminder: Upcoming Recurrent Expense");
        message.setText("Dear User,\n\nThis is a reminder for your recurrent expense:\n\n" +
                "Expense Name: " + expenseName + "\n" +
                "Amount: $" + amount + "\n" +
                "Due Date: 1st of the month\n\n" +
                "Please make sure to manage your payments accordingly.\n\nBest Regards,\nExpense Tracker Team");
    
        mailSender.send(message);
    }
    
}
