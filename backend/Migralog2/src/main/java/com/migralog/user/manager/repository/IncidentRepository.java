package com.migralog.user.manager.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.migralog.user.manager.model.Incident;


@Repository
public interface IncidentRepository extends JpaRepository<Incident, Long>{
	List<Incident> findByUserId(Long userId);
	
	List<Incident> findByTypeContainsIgnoreCaseOrKindContainsIgnoreCaseOrPainContainsIgnoreCase(String type, String kind, String pain);
	
}
