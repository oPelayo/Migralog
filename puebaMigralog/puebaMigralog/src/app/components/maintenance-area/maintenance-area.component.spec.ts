import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceAreaComponent } from './maintenance-area.component';

describe('MaintenanceAreaComponent', () => {
  let component: MaintenanceAreaComponent;
  let fixture: ComponentFixture<MaintenanceAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaintenanceAreaComponent]
    });
    fixture = TestBed.createComponent(MaintenanceAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
