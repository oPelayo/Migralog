import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Incident } from 'src/app/models/incident';
import { IncidentService } from '../../services/incident.service';
import { DatePipe } from '@angular/common';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-new-incident',
  templateUrl: './new-incident.component.html',
  styleUrls: ['./new-incident.component.css']
})
export class NewIncidentComponent implements OnInit {
[x: string]: any;
  incident: Incident = new Incident();
  userId: number; 
  startDate: Date;
  currentDate: Date;
  endDate: Date;
  isEditing: boolean = false; // Variable para indicar si se está editando un incidente existente
  @ViewChild('startTimeField', { static: true }) startTimeField: NgModel;
  @ViewChild('endTimeField', { static: true }) endTimeField: NgModel;

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
      
      const incidentId = params['id'];
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
  
  validateDates() {
    if (this.incident.startTime && this.incident.endTime) {
        const startDate = new Date(this.incident.startTime);
        const endDate = new Date(this.incident.endTime);

        if (startDate > endDate) {
            this.startTimeField.control.setErrors({ invalidDate: true });
            this.endTimeField.control.setErrors({ invalidDate: true });
        } else {
            this.startTimeField.control.setErrors(null);
            this.endTimeField.control.setErrors(null);
        }
    }

    const currentDate = new Date();
    if (this.incident.endTime && new Date(this.incident.endTime) > currentDate) {
        this.endTimeField.control.setErrors({ futureDate: true });
    } else {
        this.endTimeField.control.setErrors(null);
    }
}

  saveIncident(): void {
    // Verificar si la fecha de inicio es posterior a la fecha de fin
    if (this.incident.startTime && this.incident.endTime) {
        const startDate = new Date(this.incident.startTime);
        const endDate = new Date(this.incident.endTime);

        if (startDate > endDate) {
            console.error('La fecha de inicio no puede ser posterior a la fecha de fin.');
            return;
        }
    }

    // Verificar si la fecha de fin es posterior a la fecha actual
    const currentDate = new Date();
    if (this.incident.endTime && new Date(this.incident.endTime) > currentDate) {
        console.error('La fecha de fin no puede ser posterior a la fecha actual.');
        return;
    }

    // Si pasa todas las validaciones, guardar el incidente
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
