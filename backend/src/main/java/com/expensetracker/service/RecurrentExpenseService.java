package com.expensetracker.service;


import com.expensetracker.model.RecurrentExpense;
import com.expensetracker.repository.RecurrentExpenseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecurrentExpenseService {

    @Autowired
    private RecurrentExpenseRepository repository;

    public List<RecurrentExpense> getAllExpenses() {
        return repository.findAll();
    }

    public Optional<RecurrentExpense> getExpenseByIdAndRecurrence(Long id, String recurrenceType) {
        return repository.findByIdAndRecurrenceType(id, recurrenceType);
    }

    public RecurrentExpense addExpense(RecurrentExpense expense) {
        return repository.save(expense);
    }

    public void deleteExpense(Long id) {
        repository.deleteById(id);
    }

    public RecurrentExpense getExpenseByIdAndType(Long id, String recurrenceType) {
        Optional<RecurrentExpense> expense = repository.findByIdAndRecurrenceType(id, recurrenceType);
        return expense.orElse(null); // Returns the expense if found, otherwise null
    }
}

