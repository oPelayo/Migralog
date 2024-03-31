import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incident } from '../models/incident';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  private baseURL = "http://localhost:8080/api/v1/Incidents";

  constructor(private http: HttpClient) { }

  newIncident(incident: Incident, userId: number): Observable<Object> {
    return this.http.post(`${this.baseURL}/${userId}`, {incident, userId});
  }

  updateIncident(incident: Incident): Observable<Object> {
    return this.http.put(`${this.baseURL}`, incident);
  }

  deleteIncident(id: number): Observable<Object> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  getIncidentById(id: number): Observable<Incident> {
    return this.http.get<Incident>(`${this.baseURL}/${id}`);
  }

  getAllIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${this.baseURL}`);
  }

  getUserIncidents(userId: number): Observable<Incident[]> {
    
    // Filtrar los incidentes por el ID de usuario
    return this.http.get<Incident[]>(`${this.baseURL}/${userId}`);
  }
}
