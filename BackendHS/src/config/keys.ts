import {TokenService, UserService} from '@loopback/authentication';
import {BindingKey} from '@loopback/context';
import {Employee, User} from '../models';
import {Credentials} from '../repositories';
import {PasswordHasher} from '../services';

export namespace Keys {
  export const SECUREJWT = '2uj2qdRwI6UH8@l7tXp0#qm*1BRm5s96TjOE5lpx7J!9hTi7kK';
  export const URLAPINOTIFICATION = 'http://localhost:5000';
}

export namespace TokenServiceConstants {
  export const TOKEN_SECRET_VALUE = 'myjwts3cr3t';
  export const TOKEN_EXPIRES_IN_VALUE = '36000';
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
  export const PASSWORD_HASHER = BindingKey.create<PasswordHasher>(
    'services.hasher',
  );
  export const ROUNDS = BindingKey.create<number>('services.hasher.round');
}

export namespace UserServiceBindings {
  export const USER_SERVICE = BindingKey.create<UserService<User, Credentials>>(
    'services.user.service',
  );
}
//Configuro el BindingKey para el servicio de usuario Empleado
export namespace EmployeeServiceBindings {
  export const EMPLOYEE_SERVICE = BindingKey.create<UserService<Employee, Credentials>>(
    'services.employee.service', //previo debe estar creado el Services de Empleado con la funciones
  );
}
