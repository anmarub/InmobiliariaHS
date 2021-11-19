import {authenticate, TokenService, UserService} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {model, property, repository} from '@loopback/repository';
import {get, HttpErrors, param, post, requestBody} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import _ from 'lodash';
import {PasswordHasherBindings, TokenServiceBindings, UserServiceBindings} from '../config/keys';
import {basicAuthorization} from '../middlewares/auth.midd';
import {User} from '../models';
import {Credentials, UserRepository} from '../repositories';
import {PasswordHasher, validateCredentials} from '../services';
import {CredentialsRequestBody, UserProfileSchema} from './specs/user-controller.specs';


@model()
export class NewUserRequest extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

export class UserController {
  constructor(
    //llamo los repositorios y servicios de autenticacion
    @repository(UserRepository) public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<User, Credentials>,
  ) {
  }
//Endpoint para registrar el usuario empleado
  @post('/users/sign-up', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async create(
    @requestBody(CredentialsRequestBody)
      newUserRequest: Credentials, //usando Type en el Repository
  ): Promise<User> { //usando el modelo de User
    newUserRequest.role = ['user']; //asigno el rol de usuario

    // garantizar un valor de correo electrónico y una contraseña válidos
    validateCredentials(_.pick(newUserRequest, ['email', 'password']));

    // encriptar la contraseña
    const password = await this.passwordHasher.hashPassword(
      newUserRequest.password,
    );

    try {
      // crear el nuevo usuario
      const savedUser = await this.userRepository.create(
        _.omit(newUserRequest, 'password'),
      );

      // asigno el id y la contraseña cifrada al usuario
      await this.userRepository
        .userCredentials(savedUser.id)
        .create({password});

      return savedUser;
    } catch (error) {
      // Validar si el correo electrónico ya existe
      if (error.code === 11000 && error.errmsg.includes('E11000 duplicate key error collection')) {
        throw new HttpErrors.Conflict('Email value is already taken');
      } else {
        throw error;
      }
    }
  }

  @post('/users/sign-up/admin', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async createAdmin(
    @requestBody(CredentialsRequestBody)
      newUserRequest: Credentials, //usando Type en el Repository
  ): Promise<User> { //usando el modelo de User
    //asigno el rol de usuario
    newUserRequest.role = ['admin'];
    // garantizar un valor de correo electrónico y una contraseña válidos
    validateCredentials(_.pick(newUserRequest, ['email', 'password']));

    // encriptar la contraseña
    const password = await this.passwordHasher.hashPassword(
      newUserRequest.password,
    );

    try {
      // crear el nuevo usuario
      const savedUser = await this.userRepository.create(
        _.omit(newUserRequest, 'password'),
      );

      // asigno el id y la contraseña cifrada al usuario
      await this.userRepository
        .userCredentials(savedUser.id)
        .create({password});

      return savedUser;
    } catch (error) {
      // Validar si el correo electrónico ya existe
      if (error.code === 11000 && error.errmsg.includes('E11000 duplicate key error collection')) {
        throw new HttpErrors.Conflict('Email value is already taken');
      } else {
        throw error;
      }
    }
  }


  @get('/users/{userId}', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  @authenticate('jwt') // Implementamos autenticacion y autorizacion
  @authorize({
    allowedRoles: ['admin'], //asigno el rol de usuario que puede acceder
    voters: [basicAuthorization],
  })
  async findById(@param.path.string('userId') userId: string): Promise<User> {
    return this.userRepository.findById(userId);
  }
  @get('/users/me', {
    responses: {
      '200': {
        description: 'The current user profile',
        content: {
          'application/json': {
            schema: UserProfileSchema,
          },
        },
      },
    },
  })
  @authenticate('jwt')// Implementamos autenticacion y autorizacion
  async printCurrentUser(
    @inject(SecurityBindings.USER)
      currentUserProfile: UserProfile,
  ): Promise<User> {

    const userId = currentUserProfile[securityId];
    return this.userRepository.findById(userId);
  }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string}> {
    // garantizar un valor de correo electrónico y una contraseña válidos
    const user = await this.userService.verifyCredentials(credentials);

    // convierte un objeto User en un objeto UserProfile (conjunto reducido de propiedades)
    const userProfile = this.userService.convertToUserProfile(user);

    // crea un JSON Web Token basado en el perfil de usuario
    const token = await this.jwtService.generateToken(userProfile);

    return {token};
  }
}
