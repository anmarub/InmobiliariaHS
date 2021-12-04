import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { MD5 } from 'crypto-js';

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

  constructor(private fb : FormBuilder, private auth : AuthService) { }

  ngOnInit(): void {
  }

  userLoginCustomer(){
    const email = this.fbValidator.controls['email'].value;
    const password = this.fbValidator.controls['password'].value;
    const encryptPassword = MD5(password).toString();

    this.auth.userLogin(email, password).subscribe((credentials: any) => {
      alert('Login Successful');
    }, (error: any) => {
      alert('Login Failed');
    });
  }

}
