import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { TypeProductModel } from '../models/type-product.model';

@Injectable({
  providedIn: 'root'
})
export class TypeProductService {

  url = 'http://localhost:3000';
  token = ''

  constructor(private http : HttpClient, private auth : AuthService) { }

  GetAllTypeProduct(): Observable<TypeProductModel[]> {
    this.token = this.auth.GetToken();
    return this.http.get<TypeProductModel[]>(`${this.url}/type-products`,{
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }
}
