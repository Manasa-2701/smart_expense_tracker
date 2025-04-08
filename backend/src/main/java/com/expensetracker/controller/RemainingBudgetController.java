package com.expensetracker.controller;

import com.expensetracker.service.BudgetResponse;
import com.expensetracker.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RemainingBudgetController {

    @Autowired
    private BudgetService budgetService;

    @GetMapping("/api/getRemainingBudget")
    public BudgetResponse getRemainingBudget(
            @RequestParam Long userId,
            @RequestParam String category,
            @RequestParam int month,
            @RequestParam int year) {
        
        return budgetService.getRemainingBudget(userId, category, month, year);
    }
}
