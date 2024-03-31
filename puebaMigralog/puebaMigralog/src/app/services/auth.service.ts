import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = "http://localhost:8080/api/v1/auth";
  private reloadPageAfterLogin = false; // Bandera para controlar la recarga de la página después de iniciar sesión

  constructor(private httpClient: HttpClient, private router:Router) { }

  login(email: string, password: string): Observable<{ success: boolean, message: string, user?: User }> {
    const credentials = { email, password };
    return this.httpClient.post<any>(`${this.baseURL}/login`, credentials)
      .pipe(
        map(response => {
          // Check if the login was successful
          const success = response.success;
          const message = response.message;
          // If successful, extract user information
          const user = success ? response.user : undefined;

          // If login was successful, store user data in sessionStorage
          if (success && user) {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            // Establecer la bandera para recargar la página después de iniciar sesión
            this.reloadPageAfterLogin = true;
          }
          return { success, message, user };
        }),
        catchError(error => {
          let errorMessage = 'Error al iniciar sesión. Por favor, verifica tus credenciales.';
          if (error && error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          return of({ success: false, message: errorMessage });
        })
      );
  }

  logout() {
    sessionStorage.removeItem('currentUser');
  }  

  getAuthData(): { isLoggedIn: boolean, authLevel: number } {
    return {
      isLoggedIn: this.isLoggedIn(),
      authLevel: this.authLevel()
    };
  }

  authLevel(): number {
    let level = 0;
    const data = sessionStorage.getItem('currentUser');
    
    if (data) {
      const user = JSON.parse(data);
      console.log(user);
      const role = user.user.role;
  
      if (role === "ROLE_ADMIN") {
        level = 3;
      } else if (role === "ROLE_USER") {
        level = 2;
      } else {
        level = 1;
      }
    }
    return level;
  }
  
  isLoggedIn(): boolean {
    // Verificar si hay un usuario almacenado en sessionStorage.
    const currentUser = sessionStorage.getItem('currentUser');
    return !!currentUser; // Retorna true si existe un usuario, false si no.
  }

  shouldReloadPageAfterLogin(): boolean {
    return this.reloadPageAfterLogin;
  }

  resetReloadPageFlag(): void {
    this.reloadPageAfterLogin = false;
  }
}
