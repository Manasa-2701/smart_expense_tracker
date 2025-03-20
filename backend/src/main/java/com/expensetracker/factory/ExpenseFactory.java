package com.expensetracker.factory;

import com.expensetracker.strategy.ExpenseCategoryStrategy;

public class ExpenseFactory {
    public static ExpenseCategoryStrategy getStrategy(String category) {
        return switch (category.toLowerCase()) {
            case "food" -> () -> "Expenses related to food and dining.";
            case "travel" -> () -> "Expenses related to transportation.";
            case "entertainment" -> () -> "Expenses related to movies, games, etc.";
            default -> () -> "Other general expenses.";
        };
    }
}
