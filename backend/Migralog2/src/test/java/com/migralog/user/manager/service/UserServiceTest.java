package com.migralog.user.manager.service;

import com.migralog.user.manager.exceptions.UserNotFoundException;
import com.migralog.user.manager.model.User;
import com.migralog.user.manager.repository.UserRepository;
import io.qameta.allure.Description;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @Description("Test to save a user")
    void testSaveUser() {
        User user = new User();
        user.setPassword("plainPassword");

        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");

        userService.saveUser(user);

        verify(passwordEncoder, times(1)).encode("plainPassword");
        verify(userRepository, times(1)).save(user);
    }

    @Test
    @Description("Test to load a user by name and expect user to be found")
    void testLoadUserByUsername_UserFound() {
        User user = new User();
        user.setName("testuser");

        when(userRepository.findByName(anyString())).thenReturn(user);

        User foundUser = userService.loadUserByUsername("testuser");

        assertEquals("testuser", foundUser.getName());
    }

    @Test
    @Description("Test to load a user by name and expect user to be found")
    void testLoadUserByUsername_UserNotFound() {
        when(userRepository.findByName(anyString())).thenReturn(null);

        assertThrows(UserNotFoundException.class, () -> {
            userService.loadUserByUsername("testuser");
        });
    }

    @Test
    @Description("Test to load a user by ID and expect user to be found")
    void testLoadUserById_UserFound() {
        User user = new User();
        user.setId(1L);

        when(userRepository.findById(anyLong())).thenReturn(Optional.of(user));

        User foundUser = userService.loadUserById(1L);

        assertEquals(1L, foundUser.getId());
    }

    @Test
    @Description("Test to load a user by ID and expect user to be found")
    void testLoadUserById_UserNotFound() {
        when(userRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> {
            userService.loadUserById(1L);
        });
    }

    @Test@Description("Test to load a user by email and expect user to be found")
    void testLoadUserByEmail_UserFound() {
        User user = new User();
        user.setEmail("test@example.com");

        when(userRepository.findByEmail(anyString())).thenReturn(user);

        User foundUser = userService.loadUserByEmail("test@example.com");

        assertEquals("test@example.com", foundUser.getEmail());
    }

    @Test
    @Description("Test to load a user by email and expect user to be found")
    void testLoadUserByEmail_UserNotFound() {
        when(userRepository.findByEmail(anyString())).thenReturn(null);

        assertThrows(UserNotFoundException.class, () -> {
            userService.loadUserByEmail("test@example.com");
        });
    }
}
