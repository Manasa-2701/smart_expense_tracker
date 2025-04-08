package com.expensetracker.controller;

import com.expensetracker.model.Expense;
import com.expensetracker.service.ViewExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") // Allow frontend access
@RestController
@RequestMapping("/api")
public class ViewExpensesController {

    @Autowired
    private ViewExpenseService expenseService;

    @GetMapping("/view-expenses")
    public ResponseEntity<List<Expense>> getExpenses(
            @RequestParam("userId") Long userId,
            @RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {
        
        try {
            // Retrieve expenses between startDate and endDate
            List<Expense> expenses = expenseService.getExpenses(userId, startDate, endDate);
            
            // Return expenses with HTTP 200 status
            return new ResponseEntity<>(expenses, HttpStatus.OK);
        } catch (Exception e) {
            // Log and handle errors
            e.printStackTrace();
            
            // Return error message with HTTP 500 status
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
