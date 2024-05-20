import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = "http://localhost:8080/api/auth";
  private reloadPageAfterLogin = false; // Bandera para controlar la recarga de la página después de iniciar sesión

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<{ success: boolean, message: string, token?: string }> {
    const credentials = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });

    return this.httpClient.post<any>(`${this.baseURL}/signin`, credentials, { headers: headers, withCredentials: true })
      .pipe(
        map(response => {
          const success = response.success;
          const message = response.message;
          const token = success ? response.token : undefined;

          if (success && token) {
            sessionStorage.setItem('currentUser', JSON.stringify({ token, user: response.user }));
            this.router.navigate(['index']);
          }
          return { success, message, token };
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
    const currentUser = sessionStorage.getItem('currentUser');
    return !!currentUser;
  }

  shouldReloadPageAfterLogin(): boolean {
    return this.reloadPageAfterLogin;
  }

  resetReloadPageFlag(): void {
    this.reloadPageAfterLogin = false;
  }
}
