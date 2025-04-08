package com.expensetracker.repository;


import com.expensetracker.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {
    
    Budget findByUserIdAndCategoryAndMonthAndYear(Long userId, String category, int month, int year);
}

