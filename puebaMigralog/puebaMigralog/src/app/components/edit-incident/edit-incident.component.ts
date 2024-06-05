import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Incident } from 'src/app/models/incident';
import { IncidentService } from '../../services/incident.service';
import { ThemeService } from 'src/app/services/theme.service'; // Asegúrate de importar el ThemeService
import { NgModel } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-incident',
  templateUrl: './edit-incident.component.html',
  styleUrls: ['./edit-incident.component.css'],
  providers: [DatePipe]
})
export class EditIncidentComponent implements OnInit {
  incident: Incident = new Incident();
  startDate: string; // Cambia a string para almacenar el valor formateado
  endDate: string; // Cambia a string para almacenar el valor formateado
  showGeneralError = false;
  backgroundColorClass: string = '';
  @ViewChild('startTimeField', { static: true }) startTimeField: NgModel;
  @ViewChild('endTimeField', { static: true }) endTimeField: NgModel;

  constructor(
    private incidentService: IncidentService,
    private router: Router,
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private datePipe: DatePipe // Inyecta DatePipe
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const incidentId = params['id'];
      if (incidentId) {
        this.incidentService.getIncidentById(parseInt(incidentId)).subscribe((incident: Incident) => {
          this.incident = incident;
          // Convertir las fechas a formato `datetime-local`
          this.startDate = this.datePipe.transform(incident.startTime, 'yyyy-MM-ddTHH:mm')!;
          this.endDate = this.datePipe.transform(incident.endTime, 'yyyy-MM-ddTHH:mm')!;
        });
      }
    });

    this.themeService.getSelectedBackgroundColor().subscribe(color => {
      this.backgroundColorClass = color;
    });
  }

  validateDates() {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);

    if (startDate > endDate) {
      this.startTimeField.control.setErrors({ invalidDate: true });
      this.endTimeField.control.setErrors({ invalidDate: true });
    } else {
      this.startTimeField.control.setErrors(null);
      this.endTimeField.control.setErrors(null);
    }

    const currentDate = new Date();
    if (endDate > currentDate) {
      this.endTimeField.control.setErrors({ futureDate: true });
    } else {
      this.endTimeField.control.setErrors(null);
    }
  }

  onSubmit(form: any) {
    if (form.invalid) {
      this.showGeneralError = true;
      return;
    }
    this.showGeneralError = false;
    this.saveIncident();
  }

  saveIncident(): void {
    // Convertir las fechas de string a Date
    this.incident.startTime = new Date(this.startDate);
    this.incident.endTime = new Date(this.endDate);

    this.incidentService.updateIncident(this.incident).subscribe(response => {
      console.log('Incident updated:', response);
      this.router.navigate(['personal-area']);
    }, error => console.log(error));
  }
}