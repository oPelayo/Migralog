package com.migralog.user.manager.model;

import java.io.Serializable;
import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "incidents")
public class Incident implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "type", length = 60, nullable = false)
	private String type;
	
	@Column(name = "kind", length = 60, nullable = false)
	private String kind;
	
	@Column(name = "pain", length = 60, nullable = false)
	private String pain;
	
	@Column(name = "previousActivity", length = 60, nullable = false)
	private String previousActivity;
	
	@Column(name = "medication", length = 60, nullable = true)
	private String medication;
	
	@Column(name = "startTime")
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	// The most common ISO Date Time Format yyyy-MM-dd'T'HH:mm:ss.SSSXXX — for
	// example, "2000-10-31T01:30:00.000-05:00".
	private LocalDateTime startTime;
	
	@Column(name = "endTime")
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	private LocalDateTime endTime;
	
	@ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
	@JsonBackReference
    private User user;

	public Incident() {

	}

	public Incident(Long id, String type, String kind, String pain, String previousActivity, String medication,
			LocalDateTime startTime, LocalDateTime endTime, User user) {
		super();
		this.id = id;
		this.type = type;
		this.kind = kind;
		this.pain = pain;
		this.previousActivity = previousActivity;
		this.medication = medication;
		this.startTime = startTime;
		this.endTime = endTime;
		this.user = user;
	}

	public Incident(Long id, String type, String kind, String pain, String previousActivity,
			LocalDateTime startTime, LocalDateTime endTime, User user) {
		super();
		this.id = id;
		this.type = type;
		this.kind = kind;
		this.pain = pain;
		this.previousActivity = previousActivity;
		this.startTime = startTime;
		this.endTime = endTime;
		this.user = user;
	}

	public Incident(Long id, String type, String kind, String pain, String previousActivity,
			String medication, User user) {
		super();
		this.id = id;
		this.type = type;
		this.kind = kind;
		this.pain = pain;
		this.previousActivity = previousActivity;
		this.medication = medication;
		this.user = user;
	}

	public Incident(Long id, String type, String kind, String pain, String previousActivity,
			User user) {
		super();
		this.id = id;
		this.type = type;
		this.kind = kind;
		this.pain = pain;
		this.previousActivity = previousActivity;
		this.user = user;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String incident) {
		this.type = incident;
	}

	public String getKind() {
		return kind;
	}

	public void setKind(String kind) {
		this.kind = kind;
	}

	public String getPain() {
		return pain;
	}

	public void setPain(String pain) {
		this.pain = pain;
	}

	public String getPreviousActivity() {
		return previousActivity;
	}

	public void setPreviousActivity(String previousActivity) {
		this.previousActivity = previousActivity;
	}

	public String getMedication() {
		return medication;
	}

	public void setMedication(String medication) {
		this.medication = medication;
	}

	public LocalDateTime getStartTime() {
		return startTime;
	}

	public void setStartTime(LocalDateTime startTime) {
		this.startTime = startTime;
	}

	public LocalDateTime getEndTime() {
		return endTime;
	}

	public void setEndTime(LocalDateTime endTime) {
		this.endTime = endTime;
	}

	public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

	@Override
	public String toString() {
		return "Incident [id=" + id + ", type=" + type + ", kind=" + kind + ", pain=" + pain + ", previousActivity="
				+ previousActivity + ", medication=" + medication + ", startTime=" + startTime + ", endTime=" + endTime
				+ ", user=" + user + "]";
	}
}
