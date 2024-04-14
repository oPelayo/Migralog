package com.migralog.user.manager.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.migralog.user.manager.model.Role;
import com.migralog.user.manager.model.URole;
import com.migralog.user.manager.model.User;
import com.migralog.user.manager.repository.RoleRepository;
import com.migralog.user.manager.repository.UserRepository;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
	
	@Autowired
	private UserRepository repository;
	
	@Autowired
	  private RoleRepository roleRepository;
	
	@GetMapping("/Users")
	public List<User> listAllUsers() {
		return repository.findAll();
	}
	
	@PostMapping("/Users")
	public User saveUser(@RequestBody User user) {
	    // Asigna un rol por defecto si no se especifica
	    if (user.getRole() == null) {
	        Role defaultRole = new Role(URole.ROLE_USER);
	        user.setRole(roleRepository.save(defaultRole));
	        }
	    return repository.save(user);
	    }
	   
	@GetMapping("/Users/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Long id) {
	    Optional<User> user = repository.findById(id);
	    if (user.isPresent()) {
	        return ResponseEntity.ok(user.get());
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}

	@PutMapping("/Users/{id}")
	public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
	    Optional<User> optionalUser = repository.findById(id);
	    if (optionalUser.isPresent()) {
	        User existingUser = optionalUser.get();
	        existingUser.setId(updatedUser.getId());
	        existingUser.setName(updatedUser.getName());
	        existingUser.setLast_name(updatedUser.getLast_name());
	        existingUser.setEmail(updatedUser.getEmail());
	        existingUser.setPhone(updatedUser.getPhone());
	        
	        // Puedes manejar otros campos que quieras actualizar aquí
	        
	        User savedUser = repository.save(existingUser);
	        return ResponseEntity.ok(savedUser);
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}

	@DeleteMapping("/Users/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable Long id) {
	    try {
	        repository.deleteById(id);
	        return ResponseEntity.ok().build();
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar el usuario");
	    }
	}

}
