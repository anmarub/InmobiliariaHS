import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModelCredentials } from '../models/credentials.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:3000';
  constructor(private http : HttpClient) { }

  userLogin(email: string, password: string): Observable<ModelCredentials>{
    const x = this.http.post<ModelCredentials>("http://localhost:3000/users/login", 
    {
      email : email, 
      password : password
    },
    {
      headers: new HttpHeaders({})
    });
    return x;

  }
}
