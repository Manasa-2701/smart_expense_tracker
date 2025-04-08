package com.expensetracker.repository;


import com.expensetracker.model.RecurrentExpense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecurrentExpenseRepository extends JpaRepository<RecurrentExpense, Long> {
    List<RecurrentExpense> findByRecurrenceType(String recurrenceType);
    Optional<RecurrentExpense> findByIdAndRecurrenceType(Long id, String recurrenceType);
}