package com.migralog.user.manager.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "name", length = 60,nullable = false)
	private String name;
	
	@Column(name = "last_name", length = 60,nullable = false)
	private String last_name;
	
	@Column(name = "email", length = 60,nullable = false)
	private String email;
	
	@Column(name = "phone", length = 60,nullable = false)
	private String phone;
	
	@Column(name = "password", length = 40,nullable = false)
	private String password;
	
	@ManyToOne
	@JoinColumn(name = "role_id", nullable = false)
	private Role role;
	
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Incident> incidents;
    
    public User() {
    	
    }
	
	public User(Long id) {
		
	}

	public User(Long id, String name, String last_name, String email, String phone, String password, Role role, List<Incident> incidents) {
		super();
		this.id = id;
		this.name = name;
		this.last_name = last_name;
		this.email = email;
		this.phone = phone;
		this.password = password;
		this.role = role;
		this.incidents = incidents;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}
	
	 public List<Incident> getIncidents() {
	        return incidents;
	 }

	 public void setIncidents(List<Incident> incidents) {
	        this.incidents = incidents;
	 }

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", last_name=" + last_name + ", email=" + email + ", phone="
				+ phone + ", password=" + password + ", role=" + role + ", incidents=" + incidents + ", getId()="
				+ getId() + ", getName()=" + getName() + ", getLast_name()=" + getLast_name() + ", getEmail()="
				+ getEmail() + ", getPhone()=" + getPhone() + ", getPassword()=" + getPassword() + ", getRole()="
				+ getRole() + ", getIncidents()=" + getIncidents() + ", getClass()=" + getClass() + ", hashCode()="
				+ hashCode() + ", toString()=" + super.toString() + "]";
	}
	
}
