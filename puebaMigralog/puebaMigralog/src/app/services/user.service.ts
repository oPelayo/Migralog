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

  //Metodo para registrar
  newUser(user:User) : Observable<Object>{
    return this.http.post(`${this.baseURL}`,user).pipe(
      catchError(this.handleError));
  }

  //Metodo para actualizar
  updateUser(user:User) : Observable<Object>{
    return this.http.put(`${this.baseURL}/${user.id}`,user).pipe(
      catchError(this.handleError));
  }

  //Metodo para eliminar
  deleteUser(id:number) : Observable<Object>{
    return this.http.delete(`${this.baseURL}/${id}`).pipe(
      catchError(this.handleError));
  }

  //Metodo para buscar por id
  getUserById(id:number):Observable<User> {
    return this.http.get<User>(`${this.baseURL}/${id}`).pipe(
      catchError(this.handleError));
  }

  //Metodo para obtener todos los empleados
  getAllUsers():Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}`).pipe(
      catchError(this.handleError)); 
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
