import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IncidentDetailsModalComponent } from './incident-details-modal.component';

describe('IncidentDetailsModalComponent', () => {
  let component: IncidentDetailsModalComponent;
  let fixture: ComponentFixture<IncidentDetailsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncidentDetailsModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
        ]
    });
    fixture = TestBed.createComponent(IncidentDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
