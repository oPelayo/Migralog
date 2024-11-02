package com.migralog.user.manager.controllers;

import com.migralog.user.manager.model.Role;
import com.migralog.user.manager.model.URole;
import com.migralog.user.manager.model.User;
import com.migralog.user.manager.repository.RoleRepository;
import com.migralog.user.manager.repository.UserRepository;
import com.migralog.user.manager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "http://localhost:80")
public class UserController {
	
	@Autowired
	private UserRepository repository;

	@Autowired
	private UserService userService;
	
	@Autowired
	  private RoleRepository roleRepository;
	
	@GetMapping("/Users")
	public List<User> listAllUsers() {
		return repository.findAll();
	}

	@PostMapping("/Users")
	public ResponseEntity<User> saveUser(@RequestBody User user) {
		try {
			if (user.getRole() == null) {
				Role defaultRole = new Role(URole.ROLE_USER);
				user.setRole(roleRepository.save(defaultRole));
			}
			System.out.println("Saving user: " + user); // Debugging log

			userService.saveUser(user); // Call the service that encrypts the password and saves the user
			return ResponseEntity.status(HttpStatus.CREATED).body(user);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
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
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user");
	    }
	}

}
