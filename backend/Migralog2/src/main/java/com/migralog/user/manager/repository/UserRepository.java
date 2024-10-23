package com.migralog.user.manager.repository;

import com.migralog.user.manager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	
	User findByName(String name);
	
	User findByEmail(String email);

	List<User> findByNameContainsIgnoreCaseOrEmailContainsIgnoreCaseOrPhoneContainsIgnoreCase(String name, String email, String phone);

	@Query("select e from User e where lower(e.name) like %?1% or lower(e.email) like %?1% or lower(e.phone) like %?1%")
	List<User> findByNameEmailOrPhone(String cadena);
	
	@Query(value="SELECT * FROM USER WHERE LOWER(NAME) LIKE CONCAT('%',?1,'%') OR LOWER(EMAIL) LIKE CONCAT('%',?1,'%') OR LOWER(PHONE) LIKE CONCAT('%',?1,'%')", nativeQuery=true)
	List<User> findByNameEmailOrPhoneNative(String cadena);
}
