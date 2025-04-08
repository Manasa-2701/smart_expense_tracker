package com.expensetracker.utils;

import com.expensetracker.model.Expense;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class ExpenseUtils {
    public static Map<String, Double> calculateCategoryTotals(List<Expense> expenses) {
        return expenses.stream()
                .collect(Collectors.groupingBy(Expense::getCategory, 
                        Collectors.summingDouble(Expense::getAmount)));
    }
}
