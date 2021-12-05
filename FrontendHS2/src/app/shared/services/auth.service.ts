import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { ModelIdentification } from "../models/identification.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // variable para la url del backend
  url = "http://localhost:3000";
  //este contiene el ModeloIdetificar y lo instancia en Vacio
  dataUserSession = new BehaviorSubject<ModelIdentification>(
    new ModelIdentification()
  );

  constructor(private http: HttpClient) {
    this.VerifySessionActual();
  }

  //Metodo para autenticar usuario pasara parametros de usuario y contraseña
  userLogin(email: string, password: string): Observable<ModelIdentification> {
    const x = this.http.post<ModelIdentification>(
      `${this.url}/users/login`,
      {
        email: email,
        password: password,
      },
      {
        headers: new HttpHeaders({}),
      }
    );
    return x;
  }
  //Creo un metodo para refrescar los datos del modeloIdentificar
  refreshSession(data: ModelIdentification) {
    this.dataUserSession.next(data);
  }
  //Creamos una funcion que almacene la informacion en el localStorage
  saveSession(data: ModelIdentification) {
    data.session = true;
    const dataString = JSON.stringify(data);
    localStorage.setItem("userHS", dataString);
    this.refreshSession(data);
  }
  //creo un metodo para obtener la informacion del localstorage en formato Objecto
  GetInfoSession() {
    const SessionString = localStorage.getItem("userHS");
    if (SessionString) {
      const SessionObj = JSON.parse(SessionString);
      return SessionObj;
    } else {
      return null;
    }
  }

  //metodo para obtener la informacion del localstorage en formato String
  GetToken() {
    const SessionString = localStorage.getItem("userHS");
    if (SessionString) {
      const SessionObj = JSON.parse(SessionString);
      return SessionObj.token;
    } else {
      return "";
    }
  }
  //Creo un metodo para eliminar la infomracion del localstorage y refrescar la informacion del modeloIdentificar
  DeleteInfoSession() {
    localStorage.removeItem("userHS");
    this.refreshSession(new ModelIdentification());
  }
  //metodo para validar si un usuario esta logueado
  ValideSession() {
    const SessionString = localStorage.getItem("userHS");
    return SessionString;
  }

  //Creo un metodo para devolver el valor de inicio de sesion como ub observable
  GetSessionObservable() {
    return this.dataUserSession.asObservable();
  }

  //Creo un metodo para validar la informacion de session activa
  VerifySessionActual() {
    const datoSession = this.GetInfoSession();
    if (datoSession) {
      this.refreshSession(datoSession);
    }
  }
}
