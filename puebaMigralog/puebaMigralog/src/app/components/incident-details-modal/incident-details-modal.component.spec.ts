import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentDetailsModalComponent } from './incident-details-modal.component';

describe('IncidentDetailsModalComponent', () => {
  let component: IncidentDetailsModalComponent;
  let fixture: ComponentFixture<IncidentDetailsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncidentDetailsModalComponent]
    });
    fixture = TestBed.createComponent(IncidentDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
