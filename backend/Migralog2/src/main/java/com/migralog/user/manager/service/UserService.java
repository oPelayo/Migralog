package com.migralog.user.manager.service;

import com.migralog.user.manager.exceptions.UserNotFoundException;
import com.migralog.user.manager.model.User;
import com.migralog.user.manager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public User loadUserByUsername(String username) throws UserNotFoundException {
        User user = userRepository.findByName(username);
        if (user == null) {
            throw new UserNotFoundException("User not found with username: " + username);
        }
        return user;
    }
    
    public User loadUserById(Long userId) throws UserNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
        return user;
    }
    
    public User loadUserByEmail(String userEmail) throws UserNotFoundException {
        User user = userRepository.findByEmail(userEmail);
        if (user == null) {
            throw new UserNotFoundException("User not found with email: " + userEmail);
        }
        return user;
    }

}
