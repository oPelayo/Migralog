import { Component, OnInit } from '@angular/core';
import { Incident } from 'src/app/models/incident';
import { IncidentService } from '../../services/incident.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-incident',
  templateUrl: './new-incident.component.html',
  styleUrls: ['./new-incident.component.css']
})
export class NewIncidentComponent implements OnInit {
  incident: Incident = new Incident();
  userId: number; 
  startDate: Date;
  currentDate: Date;
  endDate: Date;

  constructor(private incidentService: IncidentService, private datePipe: DatePipe, private router:Router) { }

  ngOnInit(): void {
    // Asigna el ID del usuario adecuado
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.userId = user.user.id;
    }
    // Inicializa la fecha actual
    this.currentDate = new Date();
  }

  addEvent(event: Event, isStartDate: boolean) {
    const target = event.target as HTMLInputElement;
    const value = new Date(target.value);
    if (!isNaN(value.getTime())) {
      if (isStartDate) {
        this.startDate = value;
      } else {
        this.endDate = value;
      }
    }
  }
  

  createIncident(): void {
    // Verificar si this.selectedDate es null
    if (this.startDate && this.endDate !== null) {
      // Convertir startTime y endTime a objetos Date
      this.incident.startTime = this.startDate;
      this.incident.endTime = this.endDate;
      
    } else {
      // Si this.selectedDate es null, asignar la fecha y hora actual
      this.startDate = new Date();
      this.endDate = new Date();
      this.incident.startTime = this.currentDate;
      this.incident.endTime = this.currentDate;
    }
    
  
    // Crea el incidente con el ID del usuario proporcionado
    this.incidentService.newIncident(this.incident, this.userId).subscribe(response => {
      console.log('Incident created:', response);
      // Realiza cualquier otra acción necesaria después de crear el incidente
      this.router.navigate(['personal-area']);
    });
  }
  
}
