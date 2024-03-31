import { Component, OnInit } from '@angular/core';
import { Incident } from 'src/app/models/incident';
import { IncidentService } from '../../services/incident.service';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.css']
})
export class PersonalAreaComponent implements OnInit {
  incidents: Incident[] = [];
  mostCommonPreviousActivity: string;
  averageDuration: number;
  averageDurationFormatted: string;
  userId: number;
  userName: string;

  constructor(private incidentService: IncidentService) { }

  ngOnInit(): void {
    this.loadIncidents();
  }

  loadIncidents(): void {
    // Obtener el ID de usuario del localStorage
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.userId = user.user.id;
      this.userName = user.user.name;
      
    }
    if (this.userId) {
      // Llamar al servicio para obtener solo los incidentes del usuario actual
      this.incidentService.getUserIncidents(this.userId).subscribe(incidents => {
        this.incidents = incidents;
        this.calculateMostCommonPreviousActivity();
        this.calculateAverageDuration();
      });
    }
  }
  
  calculateMostCommonPreviousActivity(): void {
    const activityCounts: { [activity: string]: number } = {};
    for (const incident of this.incidents) {
      const activity = incident.previousActivity;
      activityCounts[activity] = (activityCounts[activity] || 0) + 1;
    }
    this.mostCommonPreviousActivity = Object.keys(activityCounts).reduce((a, b) => activityCounts[a] > activityCounts[b] ? a : b);
  }

  getDuration(incident: Incident): string {
    const startTime = new Date(incident.startTime);
    const endTime = new Date(incident.endTime);
    const duration = endTime.getTime() - startTime.getTime();
    return this.formatDuration(duration);
  }

  formatDuration(duration: number): string {
    const hours = Math.floor(duration / 3600000);
    const minutes = Math.floor((duration % 3600000) / 60000);
    return `${hours}h ${minutes}m`;
  }

  calculateAverageDuration(): String {
    if (this.incidents.length === 0) {
      return '0h'+'0m'; 
    }
  
    const totalDuration = this.incidents.reduce((total, incident) => {
      const startTime = new Date(incident.startTime);
      const endTime = new Date(incident.endTime);
      const duration = endTime.getTime() - startTime.getTime();
      return total + duration;
    }, 0);
  
    
    const averageDuration = totalDuration / this.incidents.length;
     this.averageDurationFormatted = this.formatDuration(averageDuration);
    return this.averageDurationFormatted;
  }
  
}
