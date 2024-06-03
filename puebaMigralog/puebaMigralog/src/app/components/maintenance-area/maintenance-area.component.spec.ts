import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaintenanceAreaComponent } from './maintenance-area.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

describe('MaintenanceAreaComponent', () => {
  let component: MaintenanceAreaComponent;
  let fixture: ComponentFixture<MaintenanceAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxDatatableModule],
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
