package com.migralog.user.manager.service;

import com.migralog.user.manager.exceptions.UserNotFoundException;
import com.migralog.user.manager.model.Incident;
import com.migralog.user.manager.repository.IncidentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

public class IncidentServiceTest {

    @InjectMocks
    private IncidentService incidentService;

    @Mock
    private IncidentRepository incidentRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testLoadIncidentById() throws UserNotFoundException {
        // Preparación de datos de prueba
        Incident incident = new Incident();
        incident.setId(1L);
        incident.setType("Type1");

        // Definir el comportamiento del mock
        when(incidentRepository.findById(anyLong())).thenReturn(Optional.of(incident));

        // Llamar al método del servicio
        Incident foundIncident = incidentService.loadIncidentById(1L);

        // Verificar los resultados
        assertEquals("Type1", foundIncident.getType());
    }

    @Test
    public void testLoadIncidentById_NotFound() {
        // Definir el comportamiento del mock
        when(incidentRepository.findById(anyLong())).thenReturn(Optional.empty());

        // Verificar que se lanza la excepción UserNotFoundException
        assertThrows(UserNotFoundException.class, () -> {
            incidentService.loadIncidentById(1L);
        });
    }

    @Test
    public void testLoadIncidentsByUserId() {
        // Preparación de datos de prueba
        List<Incident> incidents = new ArrayList<>();
        Incident incident1 = new Incident();
        incident1.setId(1L);
        incident1.setType("Type1");

        Incident incident2 = new Incident();
        incident2.setId(2L);
        incident2.setType("Type2");

        incidents.add(incident1);
        incidents.add(incident2);

        // Definir el comportamiento del mock
        when(incidentRepository.findByUserId(anyLong())).thenReturn(incidents);

        // Llamar al método del servicio
        List<Incident> foundIncidents = incidentService.loadIncidentsByUserId(1L);

        // Verificar los resultados
        assertEquals(2, foundIncidents.size());
        assertEquals("Type1", foundIncidents.get(0).getType());
        assertEquals("Type2", foundIncidents.get(1).getType());
    }
}
