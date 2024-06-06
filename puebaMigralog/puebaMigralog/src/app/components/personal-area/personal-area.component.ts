import { Component, OnInit, NgModule } from '@angular/core';
import { Incident } from 'src/app/models/incident';
import { IncidentService } from '../../services/incident.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { IncidentDetailsModalComponent } from '../incident-details-modal/incident-details-modal.component';
import { BaseChartDirective } from 'ng2-charts';
import { ChartTypeRegistry } from 'chart.js';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.css'],
})
export class PersonalAreaComponent implements OnInit {
  incidents: Incident[] = [];
  mostCommonPreviousActivity: string;
  averageDuration: number;
  averageDurationFormatted: string;
  userId: number;
  userName: string;

   // Nuevas propiedades para el gráfico
   barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    width: 800, 
    height: 600,
    plugins: {
      legend: {
        labels: {
          color: '#000000', // Cambia este color a uno que sea legible
          font: {
            size: 14, // Ajusta el tamaño de la fuente
            weight: 'bold', // Añade peso a la fuente
          },
        },
      },
    },
  };
  barChartLabels: string[] = [];
  barChartType: string = 'line';
  barChartLegend: boolean = true;
  barChartData: any[] = [];

  constructor(private incidentService: IncidentService, private router: Router, public dialog: MatDialog) { }

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
      // Llamar al servicio para obtener los incidentes del usuario actual
      this.incidentService.getUserIncidents(this.userId).subscribe(incidents => {
        this.incidents = incidents;
        this.calculateMostCommonPreviousActivity();
        this.calculateAverageDuration();
        this.generateBarChartData();
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

  generateBarChartData(): void {
    const activityCounts: { [activity: string]: number } = {};
    for (const incident of this.incidents) {
      const activity = incident.previousActivity;
      activityCounts[activity] = (activityCounts[activity] || 0) + 1;
    }

    // Ordenar las actividades por frecuencia y seleccionar las 4 más frecuentes
    const sortedActivities = Object.keys(activityCounts).sort((a, b) => activityCounts[b] - activityCounts[a]).slice(0, 4);
    const sortedCounts = sortedActivities.map(activity => activityCounts[activity]);

    this.barChartLabels = sortedActivities;
    this.barChartData = [{ data: sortedCounts, label: 'Actividades' }];
  }

  editIncident(incidentId: number): void {
    // Redirigir al componente NewIncidentComponent para editar el incidente
    this.router.navigate(['edit-incident', incidentId]);
  }

  deleteIncident(incidentId: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este incidente?')) {
      this.incidentService.deleteIncident(incidentId).subscribe(() => {
        
        this.incidents = this.incidents.filter(incident => incident.id !== incidentId);
        this.calculateMostCommonPreviousActivity();
        this.calculateAverageDuration();
        this.generateBarChartData();
      }, error => {
        console.error('Error al eliminar el incidente:', error);
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
      });
    }
  }
  
  openModal(incident: Incident): void {
    const dialogRef = this.dialog.open(IncidentDetailsModalComponent, {
      width: '400px',
      data: incident  // Pasa el incidente al modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
  
  viewIncidentDetails(incidentId: number): void {
    // Lógica para ver los detalles del incidente
  }
}

