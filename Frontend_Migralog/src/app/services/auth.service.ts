import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = "http://localhost:8080/api/auth";
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private httpClient: HttpClient, private router: Router) {
    const storedUser = sessionStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<{ success: boolean, message: string, token?: string }> {
    const credentials = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });

    return this.httpClient.post<any>(`${this.baseURL}/signin`, credentials, { headers: headers, withCredentials: true })
      .pipe(
        map(response => {
          const success = response.success;
          const message = response.message;
          const token = response.token;

          if (success && token) {
            const user = { token, user: response.user };
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            this.router.navigate(['/index']);
            
          }
          return { success, message, token };
        }),
        catchError(error => {
          let errorMessage = 'Failed to log in. Please verify your credentials.';
          if (error && error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          return of({ success: false, message: errorMessage });
        })
      );
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    //this.router.navigate(['/']);
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
      const user = JSON.parse(data).user;
      const role = user.role;
  
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
    return !!this.currentUserValue;
  }
}
