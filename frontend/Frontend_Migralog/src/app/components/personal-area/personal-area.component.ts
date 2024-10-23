import { Component, OnInit, NgModule, ViewEncapsulation } from '@angular/core';
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
  encapsulation: ViewEncapsulation.None
})
export class PersonalAreaComponent implements OnInit {
  incidents: Incident[] = [];
  mostCommonPreviousActivity: string;
  averageDuration: number;
  averageDurationFormatted: string;
  userId: number;
  userName: string;

   // Properties for the chart
   barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    width: 800, 
    height: 600,
    plugins: {
      legend: {
        labels: {
          boxWidth: 15,
          color: '#000000', 
          font: {
            size: 14, 
            weight: 'bold', 
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  barChartLabels: string[] = [];
  barChartType: string = 'line';
  barChartLegend: boolean = true;
  barChartData: any[] = [];

  medicationChartLabels: string[] = [];
  medicationChartData: any[] = [];
  medicationChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 15,
          color: '#000000',
          margin: 20,
          font: {
            size: 14,
            weight: 'bold',
          }
        }
      },
      tooltip: {
        enabled: true,
      },
    },    
  };


  constructor(private incidentService: IncidentService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadIncidents();
  }

  loadIncidents(): void {
    // Get user ID from localStorage
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.userId = user.user.id;
      this.userName = user.user.name; 
    }

    if (this.userId) {
      // Call service to get current user incidents
      this.incidentService.getUserIncidents(this.userId).subscribe(incidents => {
        this.incidents = incidents;
        this.calculateMostCommonPreviousActivity();
        this.calculateAverageDuration();
        this.generateBarChartData();
        this.generateMedicationEfficiencyChart();
      });
    }
  }
  
  calculateMostCommonPreviousActivity(): void {
    const activityCounts: { [activity: string]: number } = {};
    
    for (const incident of this.incidents) {
      const activity = incident.previousActivity.toLowerCase(); 
      activityCounts[activity] = (activityCounts[activity] || 0) + 1;
    }
  
    const mostCommonActivity = Object.keys(activityCounts).reduce((a, b) => activityCounts[a] > activityCounts[b] ? a : b);
  
    this.mostCommonPreviousActivity = this.capitalizeFirstLetter(mostCommonActivity); 
  }
  
  generateMedicationEfficiencyChart(): void {
    const incidentsWithMedication = this.incidents.filter(incident => incident.medication !== 'None');
    const incidentsWithoutMedication = this.incidents.filter(incident => incident.medication === null);
    
    const avgDurationWithMedication = this.calculateAverageDurationForIncidents(incidentsWithMedication) / 3600000;
    const avgDurationWithoutMedication = this.calculateAverageDurationForIncidents(incidentsWithoutMedication) / 3600000;
  
    this.medicationChartLabels = ['With', 'Without'];
    this.medicationChartData = [
      { data: [avgDurationWithMedication, avgDurationWithoutMedication], label: 'Average duration' }
    ];
  }
  
  calculateAverageDurationForIncidents(incidents: Incident[]): number {
    if (incidents.length === 0) {
      return 0;
    }
  
    const totalDuration = incidents.reduce((total, incident) => {
      const startTime = new Date(incident.startTime);
      const endTime = new Date(incident.endTime);
      const duration = endTime.getTime() - startTime.getTime();
      return total + duration;
    }, 0);
  
    return totalDuration / incidents.length;
  }

  calculateAverageDuration(): string {
    const averageDuration = this.calculateAverageDurationForIncidents(this.incidents);
    this.averageDurationFormatted = this.formatDuration(averageDuration);
    return this.averageDurationFormatted;
  }

  capitalizeFirstLetter(activity: string): string {
    return activity.charAt(0).toUpperCase() + activity.slice(1); 
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

  generateBarChartData(): void {
    const activityCounts: { [activity: string]: number } = {};
    for (const incident of this.incidents) {
      const activity = incident.previousActivity;
      activityCounts[activity] = (activityCounts[activity] || 0) + 1;
    }

    // Sort by frecuency and select the 3 most frequent
    const sortedActivities = Object.keys(activityCounts).sort((a, b) => activityCounts[b] - activityCounts[a]).slice(0, 3);
    const sortedCounts = sortedActivities.map(activity => activityCounts[activity]);

    this.barChartLabels = sortedActivities;
    this.barChartData = [{ data: sortedCounts, label: 'Activities' }];
  }

  editIncident(incidentId: number): void {
    this.router.navigate(['edit-incident', incidentId]);
  }

  deleteIncident(incidentId: number): void {
    if (confirm('Are you sure to delete this incident?')) {
      this.incidentService.deleteIncident(incidentId).subscribe(() => {
        
        this.incidents = this.incidents.filter(incident => incident.id !== incidentId);
        this.calculateMostCommonPreviousActivity();
        this.calculateAverageDuration();
        this.generateBarChartData();
      }, error => {
        console.error('Error al eliminar el incidente:', error);
      });
    }
  }
  
  openModal(incident: Incident): void {
    const dialogRef = this.dialog.open(IncidentDetailsModalComponent, {
      width: '400px',
      data: incident  
    });
  
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  
  viewIncidentDetails(incidentId: number): void {
    
  }
}

