import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
import { Location, PopStateEvent } from "@angular/common";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/shared/services/auth.service";
import { ModelIdentification } from "../../../shared/models/identification.model";

@Component({
  selector: "app-home-navbar",
  templateUrl: "./home-navbar.component.html",
  styleUrls: ["./home-navbar.component.scss"],
})
export class HomeNavbarComponent implements OnInit {
  //instancion una variable que me permitira saber si el usuario esta logueado o no
  loginStatus: boolean = false;

  // Instancion un metodo de Subcription para poder recibir los cambios de la variable
  subs: Subscription = new Subscription();
  // instancio en constructor el servicio de seguridad el cual tiene un metodo para saber si el usuario esta logueado
  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    //subscribe la respuesta obtenida y valido
    this.subs = this.auth.GetSessionObservable().subscribe({
      next: (data: ModelIdentification) => {
        this.loginStatus = data.session;
        console.log(data.session);
      },
    });
  }
}
