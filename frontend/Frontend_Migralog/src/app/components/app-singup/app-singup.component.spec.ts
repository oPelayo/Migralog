import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppSingupComponent } from './app-singup.component';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule } from '@angular/forms';

describe('AppSingupComponent', () => {
  let component: AppSingupComponent;
  let fixture: ComponentFixture<AppSingupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [AppSingupComponent],
      providers: [AuthService]
    });
    fixture = TestBed.createComponent(AppSingupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
