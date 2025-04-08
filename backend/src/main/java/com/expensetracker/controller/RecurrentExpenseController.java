package com.expensetracker.controller;

import com.expensetracker.model.RecurrentExpense;
import com.expensetracker.service.RecurrentExpenseService;
import com.expensetracker.repository.RecurrentExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/recurrent-expenses")
@CrossOrigin(origins = "http://localhost:5173") // Adjust for your frontend URL
public class RecurrentExpenseController {

    @Autowired
    private RecurrentExpenseService service;

    @GetMapping
    public List<RecurrentExpense> getAllExpenses() {
        return service.getAllExpenses();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecurrentExpense> getExpenseById(
            @PathVariable Long id,
            @RequestParam String recurrenceType) {
        Optional<RecurrentExpense> expense = service.getExpenseByIdAndRecurrence(id, recurrenceType);
        return expense.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public RecurrentExpense addExpense(@RequestBody RecurrentExpense expense) {
        return service.addExpense(expense);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        service.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }
}
