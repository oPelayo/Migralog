import { Component, OnInit, ViewChild, TemplateRef, ViewEncapsulation } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Incident } from 'src/app/models/incident';
import { IncidentService } from 'src/app/services/incident.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { IncidentDetailsModalComponent } from '../incident-details-modal/incident-details-modal.component';
import { UserDetailsModalComponent } from '../user-details-modal/user-details-modal.component';

@Component({
  selector: 'app-maintenance-area',
  templateUrl: './maintenance-area.component.html',
  styleUrls: ['./maintenance-area.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MaintenanceAreaComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  incidents: Incident[] = [];
  filteredIncidents: Incident[] = [];

  @ViewChild('userActionTemplate', { static: true }) userActionTemplate: TemplateRef<any>;
  @ViewChild('incidentActionTemplate', { static: true }) incidentActionTemplate: TemplateRef<any>;

  userColumns: any[];
  incidentColumns: any[];

  constructor(
    private userService: UserService,
    private incidentService: IncidentService,
    private datePipe: DatePipe,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data: User[]) => {
      this.users = data;
      this.filteredUsers = data;
      this.initializeColumns();
    });

    this.incidentService.getAllIncidents().subscribe((data: Incident[]) => {
      this.incidents = data;
      this.filteredIncidents = data;
      this.initializeColumns();
    });
  }

  initializeColumns(): void {
    this.userColumns = [
      { name: 'ID', prop: 'id' },
      { name: 'Name', prop: 'name' },
      { name: 'Last Name', prop: 'last_name' },
      { name: 'Email', prop: 'email' },
      { name: 'Phone', prop: 'phone' },
      { name: 'Role', prop: 'role.name' },
      { name: 'Actions', cellTemplate: this.userActionTemplate }
    ];

    this.incidentColumns = [
      { name: 'ID', prop: 'id' },
      { name: 'Type', prop: 'type' },
      { name: 'Kind', prop: 'kind' },
      { name: 'Pain', prop: 'pain' },
      { name: 'Previous Activity', prop: 'previousActivity' },
      { name: 'Medication', prop: 'medication' },
      { name: 'Start Time', prop: 'startTime', pipe: { transform: (value: string) => this.datePipe.transform(value, 'short') }},
      { name: 'End Time', prop: 'endTime', pipe: { transform: (value: string) => this.datePipe.transform(value, 'short') }},
      { name: 'Actions', cellTemplate: this.incidentActionTemplate }
    ];
  }

  updateFilter(event: any, type: string): void {
    const val = event.target.value.toLowerCase();
    if (type === 'users') {
      this.filteredUsers = this.users.filter(user => {
        return (
          user.id.toString().includes(val) ||
          user.name.toLowerCase().includes(val) ||
          user.last_name.toLowerCase().includes(val) ||
          user.email.toLowerCase().includes(val) ||
          user.phone.toLowerCase().includes(val) 
        );
      });
    } else if (type === 'incidents') {
      this.filteredIncidents = this.incidents.filter(incident => {
        const startTime = this.datePipe.transform(incident.startTime, 'short') || '';
        const endTime = this.datePipe.transform(incident.endTime, 'short') || '';
        return (
          incident.id.toString().includes(val) ||
          incident.type.toLowerCase().includes(val) ||
          incident.kind.toLowerCase().includes(val) ||
          incident.pain.toLowerCase().includes(val) ||
          incident.previousActivity.toLowerCase().includes(val) ||
          incident.medication.toLowerCase().includes(val) ||
          startTime.includes(val) ||
          endTime.includes(val)
        );
      });
    }
  }

  viewUser(user: User): void {
    const dialogRef = this.dialog.open(UserDetailsModalComponent, {
      width: '400px',
      data: user
    });
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(UserDetailsModalComponent, {
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(result).subscribe(() => {
          this.ngOnInit(); // Reload the data after update
        });
      }
    });
  }

  deleteUser(user: User): void {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.userService.deleteUser(user.id).subscribe(() => {
        this.ngOnInit(); // Reload the data after delete
      });
    }
  }

  viewIncident(incident: Incident): void {
    const dialogRef = this.dialog.open(IncidentDetailsModalComponent, {
      width: '400px',
      data: incident
    });
  }

  editIncident(incident: Incident): void {
    const dialogRef = this.dialog.open(IncidentDetailsModalComponent, {
      width: '400px',
      data: incident
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.incidentService.updateIncident(result).subscribe(() => {
          this.ngOnInit(); // Reload the data after update
        });
      }
    });
  }

  deleteIncident(incident: Incident): void {
    if (confirm('¿Estás seguro de que quieres eliminar este incidente?')) {
      this.incidentService.deleteIncident(incident.id).subscribe(() => {
        this.ngOnInit(); // Reload the data after delete
      });
    }
  }
}
