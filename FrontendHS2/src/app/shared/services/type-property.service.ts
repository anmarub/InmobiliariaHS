import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { TypePropertyModel } from '../models/type-property.model';

@Injectable({
  providedIn: 'root'
})
export class TypePropertyService {

  url = 'http://localhost:3000';
  token = ''
  constructor(private http : HttpClient, private auth : AuthService) { }

  getAllTypeProperty(): Observable<TypePropertyModel[]>{
    this.token = this.auth.GetToken();
    return this.http.get<TypePropertyModel[]>(`${this.url}/type-properties`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }
}
