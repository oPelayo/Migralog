package com.migralog.user.manager.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.migralog.user.manager.exceptions.UserNotFoundException;
import com.migralog.user.manager.model.User;
import com.migralog.user.manager.request.LoginRequest;
import com.migralog.user.manager.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/api/v1/auth/login")
    public ResponseEntity<Map<String, Object>> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            // Verificar las credenciales del usuario
            User user = userService.loadUserByEmail(loginRequest.getEmail());
           
            // Comparar la contraseña proporcionada con la almacenada en la base de datos
            if (!user.getPassword().equals(loginRequest.getPassword())) {
                // Si las credenciales son incorrectas, retornar una respuesta con success = false
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Contraseña incorrecta");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
            
            // Devolver una respuesta indicando que el inicio de sesión fue exitoso, junto con la información del usuario
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Inicio de sesión exitoso");
            response.put("user", user); 

            return ResponseEntity.ok(response);
        } catch (UserNotFoundException e) {
            // Si el usuario no se encuentra, devolver una respuesta con success = false
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Usuario no encontrado");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}

