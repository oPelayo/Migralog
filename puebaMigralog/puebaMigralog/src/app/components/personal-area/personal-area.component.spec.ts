import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PersonalAreaComponent } from './personal-area.component';
import { IncidentService } from 'src/app/services/incident.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('PersonalAreaComponent', () => {
  let component: PersonalAreaComponent;
  let fixture: ComponentFixture<PersonalAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatIconModule, MatDialogModule],
      declarations: [PersonalAreaComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [IncidentService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
