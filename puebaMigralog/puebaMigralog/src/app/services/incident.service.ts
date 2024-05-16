import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Incident } from '../models/incident';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  private baseURL = "http://localhost:8080/api/v1/Incidents";

  constructor(private http: HttpClient) { }

  newIncident(incident: Incident, userId: number): Observable<Object> {
    return this.http.post(`${this.baseURL}/${userId}`, {incident, userId}).pipe(
      catchError(this.handleError)
    );
  }

  updateIncident(incident: Incident): Observable<Object> {
    return this.http.put(`${this.baseURL}/edit/${incident.id}`, incident).pipe(
      catchError(this.handleError)
    );
  }

  deleteIncident(id: number): Observable<Object> {
    return this.http.delete(`${this.baseURL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getIncidentById(id: number): Observable<Incident> {
    return this.http.get<Incident>(`${this.baseURL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getAllIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${this.baseURL}`).pipe(
      catchError(this.handleError)
    );
  }

  getUserIncidents(userId: number): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${this.baseURL}/all/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.error('Error del lado del cliente:', error.error.message);
    } else {
      // Error del lado del servidor
      console.error('Error del lado del servidor:', error.status, error.error);
    }
    // Devolver un observable con un mensaje de error
    return throwError('Ocurrió un error. Por favor, inténtelo de nuevo más tarde.');
  }
}
