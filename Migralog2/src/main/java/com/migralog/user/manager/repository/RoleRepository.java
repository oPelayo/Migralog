package com.migralog.user.manager.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.migralog.user.manager.model.Role;
import com.migralog.user.manager.model.URole;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(URole name);
  
  
}
