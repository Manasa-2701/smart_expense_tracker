package com.expensetracker.service;

import com.expensetracker.model.User;
import com.expensetracker.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ✅ Fetch user email by user ID
    public String getUserEmailById(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.map(User::getEmail).orElse(null); // Returns email if user exists
    }
}
