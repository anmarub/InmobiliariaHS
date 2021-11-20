import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import cripto from 'crypto-js';
import jwt from 'jsonwebtoken';
import generatePassword from 'password-generator';
import {Keys} from '../config/keys';
import {CustomersRepository} from '../repositories/customers.repository';
import {EmployeeRepository} from '../repositories/employee.repository';

@injectable({scope: BindingScope.TRANSIENT})
export class AuthenticationService {
  constructor(
    @repository(EmployeeRepository)
    public repositoryEmployee: EmployeeRepository,
    @repository(CustomersRepository)
    public repositoryCustomer: EmployeeRepository) {}
  //Metodo para generar una contraseña
  generateAPassword(){
    const password = generatePassword(8, false);
    return password;
  }
  //Metodo para encriptar una contraseña
  encriptPassword(password: string){
    const passwordEncript = cripto.MD5(password).toString();
    return passwordEncript;
  }

  validationToke(token: string){
    let decriptToken;
    if(token){
      decriptToken = jwt.verify(token, Keys.SECUREJWT);
      return decriptToken;
    }else{

      throw new HttpErrors[401]('No se ha enviado token, acceso denegado');
    }
  }


}
