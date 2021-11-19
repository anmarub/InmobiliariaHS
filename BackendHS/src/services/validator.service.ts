import {HttpErrors} from '@loopback/rest';
import isemail from 'isemail';
import {Credentials} from '../repositories';

export function validateCredentials(credentials: Credentials) {
  // Validar si es un correo electrónico válido
  if (!isemail.validate(credentials.email)) {
    throw new HttpErrors.UnprocessableEntity('invalid email');
  }

  // validar cantidad de caracteres de la contraseña
  if (!credentials.password || credentials.password.length < 8) {
    throw new HttpErrors.UnprocessableEntity(
      'password must be minimum 8 characters',
    );
  }
}
