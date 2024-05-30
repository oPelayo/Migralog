import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {
  user: User = new User();
  errorMessage: string = '';
  backgroundColorClass: string = '';
  constructor(private authService: AuthService, private router: Router, private themeService: ThemeService) { }

  ngOnInit(): void {    
    // Subscribe to theme changes
    this.themeService.getSelectedBackgroundColor().subscribe(color => {
      this.backgroundColorClass = color;
    });
  }
  
  loginUser() {
    if (this.user.email && this.user.password) {
      this.authService.login(this.user.email, this.user.password).subscribe(
        (response) => {
          if (!response.success) {
            this.errorMessage = response.message;
          }
        },
        (error) => {
          if (error.status === 401) {
            this.errorMessage = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
          } else {
            this.errorMessage = 'Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.';
          }
          console.error('Error al iniciar sesión:', error);
        }
      );
    } else {
      this.errorMessage = 'Por favor, ingresa tu email y contraseña.';
    }
  }
}
