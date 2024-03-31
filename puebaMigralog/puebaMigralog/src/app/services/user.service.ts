import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  //aqui obtiene los datos de la url
  private  baseURL = "http://localhost:8080/api/v1/Users";

  constructor(private http : HttpClient) { }

  //Metodo para registrar
  newUser(user:User) : Observable<Object>{
    return this.http.post(`${this.baseURL}`,user);
  }

  //Metodo para actualizar
  updateUser(user:User) : Observable<Object>{
    return this.http.put(`${this.baseURL}/${user.id}`,user);
  }

  //Metodo para eliminar
  deleteUser(id:number) : Observable<Object>{
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  //Metodo para buscar por id
  getUserById(id:number):Observable<User> {
    return this.http.get<User>(`${this.baseURL}/${id}`);
  }

  //Metodo para obtener todos los empleados
  getAllUsers():Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}`);  
  }

  //Metodo para logarse
  /*login(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    return this.http.post('/api/v1/Users/login', credentials);
  }*/
  
}
