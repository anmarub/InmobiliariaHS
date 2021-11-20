import {authenticate, TokenService, UserService} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
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
import {EmployeeServiceBindings, PasswordHasherBindings, TokenServiceBindings} from '../config/keys';
import {basicAuthorization} from '../middlewares/auth.midd';
import {Employee} from '../models';
import {CredentialsE, EmployeeRepository} from '../repositories';
import {PasswordHasher} from '../services';
import {AuthenticationService} from '../services/authentication.service';
import {validateCredentials} from '../services/validator.service';
import {CredentialsRequestBody} from './specs/user-controller.specs';

@model()
export class NewEmployeeRequest extends Employee {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}
export class EmployeeController {
  constructor(
    @repository(EmployeeRepository)
    public employeeRepository : EmployeeRepository,
    @service(AuthenticationService)
    public serviceAuth : AuthenticationService,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(EmployeeServiceBindings.EMPLOYEE_SERVICE) // Inyecto el servicio de employe conf en la keys
    public userService: UserService<Employee, CredentialsE>, //injecto el services de empleado
  ) {}


// Metodo para crear o registrar un usuario empleado
  @post('/employees')
  @response(200, {
    description: 'Employee model instance',
    content: {'application/json': {schema: getModelSchemaRef(Employee)}},
  })
  async create(
    @requestBody(CredentialsRequestBody) //CredentialsRequestBody: Simplificamos el codigo de la clase
    newEmployee: CredentialsE, //usando Type en el Repository de empleado
  ): Promise<Employee> { //usando el modelo de User
    newEmployee.role = ['Asesor']; //asigno el rol de usuario

    validateCredentials(_.pick(newEmployee, ['email', 'password'])); //valido los datos del usuario

    const password = await this.passwordHasher.hashPassword(
      newEmployee.password,
    );

    try {
      // crear el nuevo usuario y omitir el password con el metodo omit de lodash
      const savedEmployee = await this.employeeRepository.create(
        _.omit(newEmployee, 'password'),
      );
      // asigno el id y la contraseña cifrada al usuario a la entidad userCredentials
      await this.employeeRepository
      .employeeCredentials(savedEmployee.id)
      .create({password});

      return savedEmployee;
    } catch (error) {
      if(error.code === 11000 && error.errmsg.includes('E11000 duplicate key error collection')){
        throw new HttpErrors.Conflict('Email already exists');
      }else{
        throw error;
      }
    }
  }
  @authenticate('jwt') // Implementamos autenticacion y autorizacion
  @authorize({
    allowedRoles: ['Asesor'], //asigno el rol de usuario que puede acceder
    voters: [basicAuthorization], //Middleware de autenticacion
  })
  @get('/employees/count')
  @response(200, {
    description: 'Employee model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Employee) where?: Where<Employee>,
  ): Promise<Count> {
    return this.employeeRepository.count(where);
  }

  @get('/employees')
  @response(200, {
    description: 'Array of Employee model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Employee, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Employee) filter?: Filter<Employee>,
  ): Promise<Employee[]> {
    return this.employeeRepository.find(filter);
  }

  @patch('/employees')
  @response(200, {
    description: 'Employee PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {partial: true}),
        },
      },
    })
    employee: Employee,
    @param.where(Employee) where?: Where<Employee>,
  ): Promise<Count> {
    return this.employeeRepository.updateAll(employee, where);
  }

  @get('/employees/{id}')
  @response(200, {
    description: 'Employee model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Employee, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Employee, {exclude: 'where'}) filter?: FilterExcludingWhere<Employee>
  ): Promise<Employee> {
    return this.employeeRepository.findById(id, filter);
  }

  @patch('/employees/{id}')
  @response(204, {
    description: 'Employee PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {partial: true}),
        },
      },
    })
    employee: Employee,
  ): Promise<void> {
    await this.employeeRepository.updateById(id, employee);
  }

  @put('/employees/{id}')
  @response(204, {
    description: 'Employee PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() employee: Employee,
  ): Promise<void> {
    await this.employeeRepository.replaceById(id, employee);
  }

  @del('/employees/{id}')
  @response(204, {
    description: 'Employee DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.employeeRepository.deleteById(id);
  }

  // Metodo para autenticar al usuario
@post('/employee/login', {
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
  @requestBody(CredentialsRequestBody) credentialsE: CredentialsE,
): Promise<{token: string}> {
  console.log({crendeciales: credentialsE});
  // garantizar un valor de correo electrónico y una contraseña válidos
  const user = await this.userService.verifyCredentials(credentialsE);
  console.log("Aqui", user);
  // convierte un objeto User en un objeto UserProfile (conjunto reducido de propiedades)
  const userProfile = this.userService.convertToUserProfile(user);
  console.log({userprofile: userProfile});
  // crea un JSON Web Token basado en el perfil de usuario
  const token = await this.jwtService.generateToken(userProfile);

  return {token};
}
}
