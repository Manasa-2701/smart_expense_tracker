package com.expensetracker.service;

import com.expensetracker.model.User;
import com.expensetracker.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(String username, String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            System.out.println("User already exists!");
            return null; // User already exists
        }

        User user = new User(null, username, email, password);
        return userRepository.save(user);
    }

    public Optional<User> authenticateUser(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            System.out.println("Stored Password: " + user.getPassword());
            System.out.println("Entered Password: " + password);
            
            if (user.getPassword().equals(password)) { // Check plain text password
                return Optional.of(user);
            } else {
                System.out.println("Password does not match!");
            }
        } else {
            System.out.println("User not found!");
        }

        return Optional.empty(); // Invalid credentials
    }
}
