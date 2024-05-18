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
    @Inject(MAT_DIALOG_DATA) public incident: Incident, /*Reemplazar "incident" por "data" si se recorre todo*/
    
  ) { 
    // Obtener las claves y valores del objeto Incident recorriendo todo el objeto
    //this.incidentAttributes = Object.entries(data).map(([key, value]) => ({ key, value }));
  }

  // Método para cerrar el modal
  closeModal(): void {
    this.dialogRef.close();
  }
}
