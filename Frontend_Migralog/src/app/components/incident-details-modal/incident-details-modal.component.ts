import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Incident } from 'src/app/models/incident';


@Component({
  selector: 'app-incident-details-modal',
  templateUrl: './incident-details-modal.component.html',
  styleUrls: ['./incident-details-modal.component.css']
})
export class IncidentDetailsModalComponent {
  incidentAttributes: { key: string, value: any }[];

  constructor(
    public dialogRef: MatDialogRef<IncidentDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public incident: Incident, /*Replace "incident" with "data" if traversing completely*/
    
  ) { 
    // Get the keys and values ​​of the Incident object by looping through the entire object
    // this.incidentAttributes = Object.entries(data).map(([key, value]) => ({ key, value }));
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
