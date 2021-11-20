import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Employee,
  UserCredentials,
} from '../models';
import {EmployeeRepository} from '../repositories';

export class EmployeeUserCredentialsController {
  constructor(
    @repository(EmployeeRepository) protected employeeRepository: EmployeeRepository,
  ) { }

  @get('/employees/{id}/user-credentials', {
    responses: {
      '200': {
        description: 'Employee has one UserCredentials',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UserCredentials),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<UserCredentials>,
  ): Promise<UserCredentials> {
    return this.employeeRepository.employeeCredentials(id).get(filter);
  }

  @post('/employees/{id}/user-credentials', {
    responses: {
      '200': {
        description: 'Employee model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserCredentials)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Employee.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserCredentials, {
            title: 'NewUserCredentialsInEmployee',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) userCredentials: Omit<UserCredentials, 'id'>,
  ): Promise<UserCredentials> {
    return this.employeeRepository.employeeCredentials(id).create(userCredentials);
  }

  @patch('/employees/{id}/user-credentials', {
    responses: {
      '200': {
        description: 'Employee.UserCredentials PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserCredentials, {partial: true}),
        },
      },
    })
    userCredentials: Partial<UserCredentials>,
    @param.query.object('where', getWhereSchemaFor(UserCredentials)) where?: Where<UserCredentials>,
  ): Promise<Count> {
    return this.employeeRepository.employeeCredentials(id).patch(userCredentials, where);
  }

  @del('/employees/{id}/user-credentials', {
    responses: {
      '200': {
        description: 'Employee.UserCredentials DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(UserCredentials)) where?: Where<UserCredentials>,
  ): Promise<Count> {
    return this.employeeRepository.employeeCredentials(id).delete(where);
  }
}
