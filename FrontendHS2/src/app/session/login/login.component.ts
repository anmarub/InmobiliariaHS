import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { MD5 } from 'crypto-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  fbValidator: FormGroup = this.fb.group({
    'email' : ['', [Validators.required, Validators.email]],
    'password' : ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb : FormBuilder, 
              private auth : AuthService,
              private router : Router) { }

  ngOnInit(): void {
  }

  userLoginCustomer(){
    const email = this.fbValidator.controls['email'].value;
    const password = this.fbValidator.controls['password'].value;
    const encryptPassword = MD5(password).toString();

    this.auth.userLogin(email, password).subscribe({
      next: (data : any) => {
        this.auth.saveSession(data);
        this.router.navigate(['/home/products']);
      },
      error: (error : any) => {
        alert("Datos de Inicio sesion incorrectos");
      }
    });
  }

}
