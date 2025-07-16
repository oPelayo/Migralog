package com.migralog.user.manager.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.migralog.user.manager.exceptions.ResourceNotFoundException;
import com.migralog.user.manager.model.Incident;
import com.migralog.user.manager.repository.IncidentRepository;

@Service
public class IncidentService {

	@Autowired
    private IncidentRepository incidentRepository;
	
	public Incident loadIncidentById(Long incidentId) throws ResourceNotFoundException {
		Incident incident = incidentRepository.findById(incidentId)
			.orElseThrow(() -> new ResourceNotFoundException("Incident not found with id: " + incidentId));
        return incident;
    }
	
	public List<Incident> loadIncidentsByUserId(Long userId) {
	    return incidentRepository.findByUserId(userId);
	}

}
