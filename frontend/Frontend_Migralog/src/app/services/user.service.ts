import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  //aqui obtiene los datos de la url
  private  baseURL = "http://localhost:8080/api/Users";

  constructor(private http : HttpClient) { }

  // Method to register
  newUser(user:User) : Observable<Object>{
    return this.http.post(`${this.baseURL}`,user).pipe(
      catchError(this.handleError));
  }

  // Method to update
  updateUser(user:User) : Observable<Object>{
    return this.http.put(`${this.baseURL}/${user.id}`,user).pipe(
      catchError(this.handleError));
  }

  // Method to delete
  deleteUser(id:number) : Observable<Object>{
    return this.http.delete(`${this.baseURL}/${id}`).pipe(
      catchError(this.handleError));
  }

  // Method to search by id
  getUserById(id:number):Observable<User> {
    return this.http.get<User>(`${this.baseURL}/${id}`).pipe(
      catchError(this.handleError));
  }

  // Method to obtain all employees
  getAllUsers():Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}`).pipe(
      catchError(this.handleError)); 
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
