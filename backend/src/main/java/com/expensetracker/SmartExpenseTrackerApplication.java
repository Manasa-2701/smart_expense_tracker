package com.expensetracker;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableScheduling
public class SmartExpenseTrackerApplication {
    public static void main(String[] args) {
        SpringApplication.run(SmartExpenseTrackerApplication.class, args);
    }
}
