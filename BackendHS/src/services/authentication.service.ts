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
  //metodo para validar un usuario cliente
  async loginUserCustomer(user: string, password: string){
    //Validacion que los campos de usuario o contraseña contengan informacin
    if(!(user && password)){
      throw new HttpErrors[401]('Se requiere Usuario y constraseña');
    }
    let valueUser;
    let token;
    //Validacion de Usuario y contraseña con los datos almacenados
    try {
      valueUser = await this.repositoryCustomer.findOne({
        where:{
          email: user,
          password: password
        },
      });
      token = jwt.sign({email: valueUser?.email, password: valueUser?.password}, Keys.SECUREJWT, { expiresIn: '1h' });
      return token;
    } catch (error) {

      return new HttpErrors[401]('Usuario o contraseña invalida');
    }
  }
  //metodo para validar un usuario Empleado
  async loginUserEmployee(user: string, password: string){
    //Validacion que los campos de usuario o contraseña contengan informacin
    if(!(user && password)){
      throw new HttpErrors[401]('Se requiere Usuario y constraseña');
    }
    let valueUser;
    let token;
    //Validacion de Usuario y contraseña con los datos almacenados
    try {
      valueUser = await this.repositoryEmployee.findOne({
        where:{
          email: user,
          password: password
        },
      });
      token = jwt.sign({email: valueUser?.email, password: valueUser?.password, role: valueUser?.role}, Keys.SECUREJWT, { expiresIn: '1h' });
      return token;
    } catch (error) {

      return new HttpErrors[401]('Usuario o contraseña invalida');
    }
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
