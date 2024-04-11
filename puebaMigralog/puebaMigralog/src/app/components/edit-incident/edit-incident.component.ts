import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Incident } from 'src/app/models/incident';
import { IncidentService } from '../../services/incident.service';

@Component({
  selector: 'app-edit-incident',
  templateUrl: './edit-incident.component.html',
  styleUrls: ['./edit-incident.component.css']
})
export class EditIncidentComponent implements OnInit {
  incident: Incident = new Incident();
  startDate: Date;
  endDate: Date;

  constructor(private incidentService: IncidentService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Obtener el ID del incidente de la ruta
    this.route.params.subscribe(params => {
      const incidentId = params['id'];
      if (incidentId) {
        // Cargar los datos del incidente
        this.incidentService.getIncidentById(parseInt(incidentId)).subscribe((incident: Incident) => {
          this.incident = incident;
          // Convertir las fechas a objetos Date para que se muestren correctamente en los campos de entrada
          this.startDate = new Date(incident.startTime);
          this.endDate = new Date(incident.endTime);
        });
      }
    });
  }

  saveIncident(): void {
    // Convertir startTime y endTime a objetos Date
    this.incident.startTime = this.startDate;
    this.incident.endTime = this.endDate;

    // Llamar al método de actualización del servicio
    this.incidentService.updateIncident(this.incident).subscribe(response => {
      console.log('Incident updated:', response);
      // Redirigir al área personal después de actualizar el incidente
      this.router.navigate(['personal-area']);
    });
  }
}


