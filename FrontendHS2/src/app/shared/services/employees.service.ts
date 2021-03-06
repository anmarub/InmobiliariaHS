import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  url = 'http://localhost:3000';
  token = ''

  constructor(private http : HttpClient, private auth : AuthService) { }

  getAllEmployees(): Observable<EmployeeModel[]>{
    this.token = this.auth.GetToken();
    return this.http.get<EmployeeModel[]>(`${this.url}/employees`,{
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }
}
