package com.expensetracker.service;

import com.expensetracker.model.Expense;
import com.expensetracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ViewExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    public List<Expense> getExpenses(Long userId, LocalDate startDate, LocalDate endDate) {
        try {
            // Fetch expenses for the user within the date range
            return expenseRepository.findByUserIdAndDateBetween(userId, startDate, endDate);
        } catch (Exception e) {
            // Log the error and throw an exception with a meaningful message
            e.printStackTrace();
            throw new RuntimeException("Error fetching expenses: " + e.getMessage());
        }
    }
}
