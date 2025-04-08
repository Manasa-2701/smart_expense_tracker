package com.expensetracker.service;

import com.expensetracker.model.Budget;
import com.expensetracker.model.Expense;
import com.expensetracker.repository.BudgetRepository;
import com.expensetracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    public BudgetResponse getRemainingBudget(Long userId, String category, int month, int year) {
        // Fetch the user's budget for the specified month and year
        Budget userBudget = budgetRepository.findByUserIdAndCategoryAndMonthAndYear(userId, category, month, year);

        if (userBudget == null) {
            return new BudgetResponse(BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO);
        }

        BigDecimal budgetAmount = userBudget.getBudget();

        // Fetch the expenses for the user within the date range and filter by category
        List<Expense> expenses = expenseRepository.findByUserIdAndCategoryAndDateBetween(userId, category, 
                LocalDate.of(year, month, 1), LocalDate.of(year, month, 30));  // Assuming month ends on 30th for simplicity

        // Calculate the total expenses for the given category
        BigDecimal totalExpenses = expenses.stream()
                .map(expense -> new BigDecimal(expense.getAmount()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Calculate the remaining budget
        BigDecimal remainingBudget = budgetAmount.subtract(totalExpenses);

        return new BudgetResponse(budgetAmount, totalExpenses, remainingBudget);
    }
}
