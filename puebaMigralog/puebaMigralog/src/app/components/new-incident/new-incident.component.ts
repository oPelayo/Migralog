import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Incident } from 'src/app/models/incident';
import { IncidentService } from '../../services/incident.service';
import { DatePipe } from '@angular/common';

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
  isEditing: boolean = false; // Variable para indicar si se está editando un incidente existente

  constructor(private incidentService: IncidentService, private datePipe: DatePipe, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Obtener el ID del usuario adecuado
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.userId = user.user.id;
    }
    // Inicializar la fecha actual
    this.currentDate = new Date();

    // Verificar si se está editando un incidente existente
    this.route.queryParams.subscribe(params => {
      console.log(params);
      const incidentId = params['id'];
      console.log(incidentId);
      if (incidentId) {
        this.isEditing = true;
        // Cargar los datos del incidente que se está editando
        this.incidentService.getIncidentById(parseInt(incidentId)).subscribe((incident: Incident) => {
          this.incident = incident;
          console.log(incident);
          // Convertir las fechas a objetos Date para que se muestren correctamente en los campos de entrada
          this.startDate = new Date(incident.startTime);
          this.endDate = new Date(incident.endTime);
        });
      }
    });
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
  
  saveIncident(): void {
    // Convertir startTime y endTime a objetos Date
    this.incident.startTime = this.startDate;
    this.incident.endTime = this.endDate;

    if (this.isEditing) {
      // Si se está editando, llamar al método de actualización del servicio
      this.incidentService.updateIncident(this.incident).subscribe(response => {
        console.log('Incident updated:', response);
        // Realizar cualquier otra acción necesaria después de actualizar el incidente
        this.router.navigate(['personal-area']);
      });
    } else {
      // Si no se está editando, llamar al método de creación del servicio
      this.incidentService.newIncident(this.incident, this.userId).subscribe(response => {
        console.log('Incident created:', response);
        // Realizar cualquier otra acción necesaria después de crear el incidente
        this.router.navigate(['personal-area']);
      });
    }
  }
}
