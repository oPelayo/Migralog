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
      console.error('Client side error:', error.error.message);
    } else {
      console.error('Server side error:', error.status, error.error);
    }
    // Return an observable with an error message
    return throwError('An error occurred. Please try again later.');
  }
}
