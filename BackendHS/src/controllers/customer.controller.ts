import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import fetch from 'node-fetch';
import {Keys} from '../config/keys';
import {Customers} from '../models';
import {CustomersRepository} from '../repositories';
import {AuthenticationService} from '../services/authentication.service';

export class CustomerController {
  constructor(
    @repository(CustomersRepository)
    public customersRepository : CustomersRepository,
    @service(AuthenticationService)
    public serviceAuth : AuthenticationService
  ) {}

  @post('/customers')
  @response(200, {
    description: 'Customers model instance',
    content: {'application/json': {schema: getModelSchemaRef(Customers)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customers, {
            title: 'NewCustomers',
            exclude: ['id'],
          }),
        },
      },
    })
    customers: Omit<Customers, 'id'>,
  ): Promise<Customers> {
    // instanciar metodo para generar clave y asignar al cliente
    const generatePassword = this.serviceAuth.generateAPassword();
    const encriptPassword = this.serviceAuth.encriptPassword(generatePassword);
    customers.password = encriptPassword;
    const createdCustomer = this.customersRepository.create(customers);
    // Enviar notificaciones
    const mailRecipient = customers.email;
    const emailSubject = 'Bienvenido a nuestra plataforma';
    const emailBody = `Hola!! ${customers.names}, su nombre de usuario es ${customers.email}
                        y su contraseña provisional es: ${encriptPassword}
                        no olvide cambiarla en el momento de ingresa a la plataforma`;
    // Enviar correo electronico usando node-fetch
    const urlSend = `${Keys.URLAPINOTIFICATION}/mensaje-correo?correo_destino=${mailRecipient}&asunto=${emailSubject}&contenido_correo=${emailBody}`;
    const fechtRepose = fetch(urlSend, {
      method: 'GET',
      headers: {'Content-Type': 'text/plain'},
    });
    console.log(fechtRepose);
    console.log(urlSend);
    return createdCustomer;

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
