package com.migralog.user.manager.controllers;

import com.migralog.user.manager.payload.request.LoginRequest;
import com.migralog.user.manager.security.jwt.JwtUtils;
import com.migralog.user.manager.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:80")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping(value = "/signin", produces = "application/json")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Login successful");
            response.put("token", jwt);
            response.put("user", userDetails);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}



























/*
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
import com.migralog.user.manager.payload.request.LoginRequest;
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
*/

