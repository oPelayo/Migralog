import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Incident } from 'src/app/models/incident';
import { IncidentService } from '../../services/incident.service';
import { ThemeService } from 'src/app/services/theme.service'; 
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
  startDate: string; 
  endDate: string; 
  showGeneralError = false;
  backgroundColorClass: string = '';
  @ViewChild('startTimeField', { static: true }) startTimeField: NgModel;
  @ViewChild('endTimeField', { static: true }) endTimeField: NgModel;

  constructor(
    private incidentService: IncidentService,
    private router: Router,
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private datePipe: DatePipe 
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const incidentId = params['id'];
      if (incidentId) {
        this.incidentService.getIncidentById(parseInt(incidentId)).subscribe((incident: Incident) => {
          this.incident = incident;
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

  capitalizeFirstLetter(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
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
    this.incident.type = this.capitalizeFirstLetter(this.incident.type);
    this.incident.kind = this.capitalizeFirstLetter(this.incident.kind);
    this.incident.pain = this.capitalizeFirstLetter(this.incident.pain);
    this.incident.previousActivity = this.capitalizeFirstLetter(this.incident.previousActivity);
    this.incident.medication = this.capitalizeFirstLetter(this.incident.medication);
    // Convert dates from string to Date
    this.incident.startTime = new Date(this.startDate);
    this.incident.endTime = new Date(this.endDate);

    this.incidentService.updateIncident(this.incident).subscribe(response => {
      //console.log('Incident updated:', response);
      this.router.navigate(['personal-area']);
    }, error => console.log(error));
  }
}