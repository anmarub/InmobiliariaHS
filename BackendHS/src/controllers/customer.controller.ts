import {TokenService, UserService} from '@loopback/authentication';
import {inject, service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  model,
  property,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import _ from 'lodash';
import {CustomerServiceBindings, PasswordHasherBindings, TokenServiceBindings} from '../config/keys';
import {Customers} from '../models';
import {CredentialsCustomer, CustomersRepository} from '../repositories';
import {PasswordHasher, validateCredentials} from '../services';
import {AuthenticationService} from '../services/authentication.service';
import {CredentialsRequestBody} from './specs/user-controller.specs';
@model()
export class NewCustomerRequest extends Customers {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}
export class CustomerController {
  constructor(
    @repository(CustomersRepository)
    public customersRepository : CustomersRepository,
    @service(AuthenticationService)
    public serviceAuth : AuthenticationService,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(CustomerServiceBindings.CUSTOMER_SERVICE) // Inyecto el servicio de employe conf en la keys
    public userService: UserService<Customers, CredentialsCustomer>, //injecto el services de clientes
  ) {}

  @post('/customers')
  @response(200, {
    description: 'Customers model instance',
    content: {'application/json': {schema: getModelSchemaRef(Customers)}},
  })
  async create(
    @requestBody(CredentialsRequestBody) //CredentialsRequestBody: Simplificamos el codigo de la clase
    newCustomer: CredentialsCustomer, //usando Type en el Repository de empleado
  ): Promise<Customers> { //usando el modelo de User
    newCustomer.role = ['customers']; //asigno el rol de usuario

    validateCredentials(_.pick(newCustomer, ['email', 'password'])); //valido los datos del usuario

    const password = await this.passwordHasher.hashPassword(
      newCustomer.password,
    );

    try {
      // crear el nuevo usuario y omitir el password con el metodo omit de lodash
      const savedCustomer = await this.customersRepository.create(
        _.omit(newCustomer, 'password'),
      );
      // asigno el id y la contraseña cifrada al usuario a la entidad userCredentials
      await this.customersRepository
      .CustomerCredentials(savedCustomer.id)
      .create({password});

      return savedCustomer;
    } catch (error) {
      if(error.code === 11000 && error.errmsg.includes('E11000 duplicate key error collection')){
        throw new HttpErrors.Conflict('Email already exists');
      }else{
        throw error;
      }
    }

  }
  // Metodo para autenticar al usuario
@post('/customer/login', {
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
  @requestBody(CredentialsRequestBody) credentialsCustomer: CredentialsCustomer,
): Promise<{token: string}> {

  // garantizar un valor de correo electrónico y una contraseña válidos
  const user = await this.userService.verifyCredentials(credentialsCustomer);

  // convierte un objeto User en un objeto UserProfile (conjunto reducido de propiedades)
  const userProfile = this.userService.convertToUserProfile(user);

  // crea un JSON Web Token basado en el perfil de usuario
  const token = await this.jwtService.generateToken(userProfile);

  return {token};
}
  @get('/customers/count')
  @response(200, {
    description: 'Customers model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Customers) where?: Where<Customers>,
  ): Promise<Count> {
    return this.customersRepository.count(where);
  }

  @get('/customers')
  @response(200, {
    description: 'Array of Customers model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Customers, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Customers) filter?: Filter<Customers>,
  ): Promise<Customers[]> {
    return this.customersRepository.find(filter);
  }

  @patch('/customers')
  @response(200, {
    description: 'Customers PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customers, {partial: true}),
        },
      },
    })
    customers: Customers,
    @param.where(Customers) where?: Where<Customers>,
  ): Promise<Count> {
    return this.customersRepository.updateAll(customers, where);
  }

  @get('/customers/{id}')
  @response(200, {
    description: 'Customers model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Customers, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Customers, {exclude: 'where'}) filter?: FilterExcludingWhere<Customers>
  ): Promise<Customers> {
    return this.customersRepository.findById(id, filter);
  }

  @patch('/customers/{id}')
  @response(204, {
    description: 'Customers PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customers, {partial: true}),
        },
      },
    })
    customers: Customers,
  ): Promise<void> {
    await this.customersRepository.updateById(id, customers);
  }

  @put('/customers/{id}')
  @response(204, {
    description: 'Customers PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() customers: Customers,
  ): Promise<void> {
    await this.customersRepository.replaceById(id, customers);
  }

  @del('/customers/{id}')
  @response(204, {
    description: 'Customers DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.customersRepository.deleteById(id);
  }
}
