// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/frase-del-dia'; 

  constructor(private http: HttpClient) {}

  getDatos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  
}
