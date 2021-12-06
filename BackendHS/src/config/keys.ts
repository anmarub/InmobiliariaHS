import {TokenService, UserService} from '@loopback/authentication';
import {BindingKey} from '@loopback/context';
import {Customers, Employee, User} from '../models';
import {Credentials} from '../repositories';
import {PasswordHasher} from '../services';

export namespace Keys {
  export const SECUREJWT = 'P&Vj46Q4RLXbi&y3YfOypaEK5RrdyjZlP$1cgeX2bDQ0ttbbqQ';
  export const URLAPINOTIFICATION = 'http://localhost:5000';
}

export namespace TokenServiceConstants {
  export const TOKEN_SECRET_VALUE =
    '9%T!LSLVx3P#i9hOYfh&c7hA^Qa6g!HMUBi09JAkNgSgJm!eZH';
  export const TOKEN_EXPIRES_IN_VALUE = '3600';
}

export namespace TokenServiceBindings {
  export const TOKEN_SECRET = BindingKey.create<string>(
    'authentication.jwt.secret',
  );
  export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
    'authentication.jwt.expires.in.seconds',
  );
  export const TOKEN_SERVICE = BindingKey.create<TokenService>(
    'services.authentication.jwt.tokenservice',
  );
}

export namespace PasswordHasherBindings {
  export const PASSWORD_HASHER =
    BindingKey.create<PasswordHasher>('services.hasher');
  export const ROUNDS = BindingKey.create<number>('services.hasher.round');
}

export namespace UserServiceBindings {
  export const USER_SERVICE = BindingKey.create<UserService<User, Credentials>>(
    'services.user.service',
  );
}
//Configuro el BindingKey para el servicio de usuario Empleado
export namespace EmployeeServiceBindings {
  export const EMPLOYEE_SERVICE = BindingKey.create<
    UserService<Employee, Credentials>
  >(
    'services.employee.service', //previo debe estar creado el Services de Empleado con la funciones
  );
}

//Configuro el BindingKey para el servicio de usuario Cliente
export namespace CustomerServiceBindings {
  export const CUSTOMER_SERVICE = BindingKey.create<
    UserService<Customers, Credentials>
  >(
    'services.customer.service', //previo debe estar creado el Services de Cliente con la funciones
  );
}
