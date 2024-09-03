import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NewIncidentComponent } from './new-incident.component';
import { IncidentService } from 'src/app/services/incident.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('NewIncidentComponent', () => {
  let component: NewIncidentComponent;
  let fixture: ComponentFixture<NewIncidentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [NewIncidentComponent],
      providers: [
        IncidentService,
        DatePipe,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'test-id' }),
            queryParams: of({ id: 'test-id' })
          }
        }
      ]
    });
    fixture = TestBed.createComponent(NewIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
