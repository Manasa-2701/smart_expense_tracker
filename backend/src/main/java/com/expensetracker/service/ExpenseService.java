package com.expensetracker.service;

import com.expensetracker.model.Expense;
import com.expensetracker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ExpenseService {
    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public Expense addExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }


    public Map<String, Double> getCategoryWiseExpenses(Long userId, LocalDate startDate, LocalDate endDate) {
        List<Object[]> results = expenseRepository.getExpensesByCategoryAndDate(userId, startDate, endDate);
        Map<String, Double> categoryExpenses = new HashMap<>();
    
        for (Object[] row : results) {
            String category = (String) row[0];
            Double totalAmount = (Double) row[1];
            categoryExpenses.put(category, totalAmount);
        }
        return categoryExpenses;
    }

}
