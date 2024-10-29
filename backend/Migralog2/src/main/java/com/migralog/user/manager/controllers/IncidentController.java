package com.migralog.user.manager.controllers;

import com.migralog.user.manager.model.Incident;
import com.migralog.user.manager.model.User;
import com.migralog.user.manager.repository.IncidentRepository;
import com.migralog.user.manager.repository.UserRepository;
import com.migralog.user.manager.service.IncidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;




@RestController
@RequestMapping("/api/v1/")
@CrossOrigin(origins = "http://localhost:80")
public class IncidentController {

	@Autowired
	private IncidentRepository repository;
	
	@Autowired
    private IncidentService incidentService;
	
	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("/Incidents")
	public List<Incident> listAllIncidents() {
		return repository.findAll();
	}
	
	
	@PostMapping("/Incidents/{userId}")
    public ResponseEntity<Incident> saveIncident(@PathVariable Long userId, @RequestBody Map<String, Object> payload) {
		// Obtener el objeto "incident" del payload
		Map<String, Object> incidentPayload = (Map<String, Object>) payload.get("incident");
        // Extraer los datos del incidente del payload
        String type = (String) incidentPayload.get("type");
        String kind = (String) incidentPayload.get("kind");
        String pain = (String) incidentPayload.get("pain");
        String previousActivity = (String) incidentPayload.get("previousActivity");
        String medication = (String) incidentPayload.get("medication");
        String startTimeString = (String) incidentPayload.get("startTime");
        String endTimeString = (String) incidentPayload.get("endTime");
        
        startTimeString = startTimeString.replace("Z", "");
        endTimeString = endTimeString.replace("Z", "");
        
        LocalDateTime startTime = LocalDateTime.parse(startTimeString);
        LocalDateTime endTime = LocalDateTime.parse(endTimeString);
        
        // Crear un nuevo objeto Incident y establecer sus atributos
        Incident incident = new Incident();
        incident.setType(type);
        incident.setKind(kind);
        incident.setPain(pain);
        incident.setPreviousActivity(previousActivity);
        incident.setMedication(medication);
        incident.setStartTime(startTime);
        incident.setEndTime(endTime);
        
        
        // Obtener el usuario relacionado y establecerlo en el incidente
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            incident.setUser(user);
        } else {
            // Si el usuario no se encuentra, devolver un ResponseEntity con estado 404 (No encontrado)
            return ResponseEntity.notFound().build();
        }
        
        // Guardar el incidente en la base de datos
        Incident savedIncident = repository.save(incident);
        
        // Devolver el objeto Incident guardado como respuesta
        return ResponseEntity.ok(savedIncident);
    }


	
	@GetMapping("/Incidents/all/{userId}")
    public ResponseEntity<List<Incident>> getIncidentsByUserId(@PathVariable Long userId) {
        List<Incident> incidents = incidentService.loadIncidentsByUserId(userId);
        if (!incidents.isEmpty()) {
            return ResponseEntity.ok(incidents);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

	@PutMapping("/Incidents/edit/{id}")
	public ResponseEntity<Incident> updateIncident(@PathVariable Long id, @RequestBody Incident updatedIncident) {
	    Optional<Incident> optionalIncident = repository.findById(id);
	    if (optionalIncident.isPresent()) {
	    	Incident existingIncident = optionalIncident.get();
	        existingIncident.setId(updatedIncident.getId());
	        existingIncident.setType(updatedIncident.getType());
	        existingIncident.setKind(updatedIncident.getKind());
	        existingIncident.setPain(updatedIncident.getPain());
            existingIncident.setPreviousActivity(updatedIncident.getPreviousActivity());
	        existingIncident.setMedication(updatedIncident.getMedication());
            existingIncident.setStartTime(updatedIncident.getStartTime()); // Actualizar la fecha de inicio
            existingIncident.setEndTime(updatedIncident.getEndTime()); // Actualizar la fecha de fin
	        

	        
	        Incident savedIncident = repository.save(existingIncident);
	        return ResponseEntity.ok(savedIncident);
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}


	@GetMapping("/Incidents/{id}")
public ResponseEntity<Incident> getIncidentById(@PathVariable Long id) {
    Optional<Incident> incident = repository.findById(id);
    if (incident.isPresent()) {
        return ResponseEntity.ok(incident.get());
    } else {
        return ResponseEntity.notFound().build();
    }
}

	@DeleteMapping("/Incidents/{id}")
	public ResponseEntity<?> deleteIncident(@PathVariable Long id) {
	    try {
	        repository.deleteById(id);
	        return ResponseEntity.ok().build();
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar el usuario");
	    }
	}
	
}
