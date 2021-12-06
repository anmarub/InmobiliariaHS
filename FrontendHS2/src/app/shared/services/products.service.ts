import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { ProductsModel } from "../models/products.model";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  url = "http://localhost:3000";
  token: string = "";

  constructor(private http: HttpClient, private auth: AuthService) {}

  //metodo obtener todos los productos
  getAllProducts(): Observable<ProductsModel[]> {
    this.token = this.auth.GetToken();
    return this.http.get<ProductsModel[]>(`${this.url}/products`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }
  //metodo obtener un solo producto
  getProductId(id: string): Observable<ProductsModel> {
    this.token = this.auth.GetToken();
    return this.http.get<ProductsModel>(`${this.url}/products/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }
  //metodo para crear un producto
  createProduct(product: ProductsModel): Observable<ProductsModel> {
    this.token = this.auth.GetToken();
    return this.http.post<ProductsModel>(`${this.url}/products`, product, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }
  //metodo para actualizar un producto
  UpdateProduct(product: ProductsModel): Observable<ProductsModel> {
    this.token = this.auth.GetToken();
    return this.http.put<ProductsModel>(
      `${this.url}/products/${product.id}`,
      product,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      }
    );
  }
  //metodo para eliminar un producto
  DeleteProduct(id: string): Observable<any> {
    this.token = this.auth.GetToken();
    return this.http.delete(`${this.url}/products/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }
}
