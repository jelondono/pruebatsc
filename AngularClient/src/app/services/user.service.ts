import { ResponseFull } from './../models/RespuestaModel';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { GeneralInterface } from './../models/General.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API_URI = this.generalInterface.urlApi;

  constructor(
    private http: HttpClient,
    private router: Router,
    private generalInterface: GeneralInterface
  ) {}

  //TODO: GET USERS
  getUsers() {
    return this.http.get<ResponseFull>(`${this.API_URI}/getUsers`);
  }

  //TODO: INSERT USERS
  insertUser(modelEmpleado) {
    return this.http.post<ResponseFull>(`${this.API_URI}/addUser`, modelEmpleado);
  }

  //TODO:UPDATE USER

  updateUser(modelEmpleado) {
    return this.http.put<ResponseFull>(`${this.API_URI}/updateUser`, modelEmpleado);
  }

  //TODO: DELETE USER

  deleteUser(numeroidentificacion) {
    return this.http.delete<ResponseFull>(`${this.API_URI}/deleteUser/` + numeroidentificacion );
  }
}
