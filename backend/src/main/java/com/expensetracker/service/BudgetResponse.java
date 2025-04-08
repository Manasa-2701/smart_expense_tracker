package com.expensetracker.service;

import java.math.BigDecimal;

public class BudgetResponse {

    private BigDecimal budget;
    private BigDecimal totalExpenses;
    private BigDecimal remainingBudget;

    public BudgetResponse(BigDecimal budget, BigDecimal totalExpenses, BigDecimal remainingBudget) {
        this.budget = budget;
        this.totalExpenses = totalExpenses;
        this.remainingBudget = remainingBudget;
    }

    public BigDecimal getBudget() {
        return budget;
    }

    public void setBudget(BigDecimal budget) {
        this.budget = budget;
    }

    public BigDecimal getTotalExpenses() {
        return totalExpenses;
    }

    public void setTotalExpenses(BigDecimal totalExpenses) {
        this.totalExpenses = totalExpenses;
    }

    public BigDecimal getRemainingBudget() {
        return remainingBudget;
    }

    public void setRemainingBudget(BigDecimal remainingBudget) {
        this.remainingBudget = remainingBudget;
    }
}
