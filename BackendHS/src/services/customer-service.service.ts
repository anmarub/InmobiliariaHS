import {UserService} from '@loopback/authentication';
import {inject} from '@loopback/context';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {PasswordHasherBindings} from '../config/keys';
import {Customers} from '../models';
import {CustomersRepository} from '../repositories';
import {CredentialsCustomer} from '../repositories/customers.repository';
import {PasswordHasher} from './hash-password.service';
//Creo una clase que hereda de UserService - esta debe ser cargada en el Application.ts
export class CustomerService implements UserService<Customers, CredentialsCustomer> {
  constructor(
    //Injecto los repositorios al constructor
    @repository(CustomersRepository) public customerRepository: CustomersRepository,
    //Injecto el servicio de crear hash para cifrar la contraseña
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
  ) {
  }
  //Vefico la contraseña pasada mediante el servicio de hash
  async verifyCredentials(credentials: CredentialsCustomer): Promise<Customers> {
    const invalidCredentialsError = 'Invalid email or password.';

    const foundUser = await this.customerRepository.findOne({
      where: {email: credentials.email},
    });
    //Si el usuario o contraseña no son correctos genera una exception
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const credentialsFound = await this.customerRepository.findCredentials(
      foundUser.id,
    );
    if (!credentialsFound) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }
    //comparamos la informacion del usuario con la contraseña
    const passwordMatched = await this.passwordHasher.comparePassword(
      credentials.password,
      credentialsFound.password,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    return foundUser;
  }
  //convierto la informacion recibida en un objeto UserProfile
  convertToUserProfile(customer: Customers): UserProfile {
    return {
      [securityId]: customer.id,
      id: customer.id,
      role: customer.role,
    };
  }
}
