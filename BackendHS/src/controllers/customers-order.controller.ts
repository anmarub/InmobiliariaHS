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
  Customers,
  Order,
} from '../models';
import {CustomersRepository} from '../repositories';

export class CustomersOrderController {
  constructor(
    @repository(CustomersRepository) protected customersRepository: CustomersRepository,
  ) { }

  @get('/customers/{id}/orders', {
    responses: {
      '200': {
        description: 'Array of Customers has many Order',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Order)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Order>,
  ): Promise<Order[]> {
    return this.customersRepository.orders(id).find(filter);
  }

  @post('/customers/{id}/orders', {
    responses: {
      '200': {
        description: 'Customers model instance',
        content: {'application/json': {schema: getModelSchemaRef(Order)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Customers.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {
            title: 'NewOrderInCustomers',
            exclude: ['id'],
            optional: ['customersId']
          }),
        },
      },
    }) order: Omit<Order, 'id'>,
  ): Promise<Order> {
    return this.customersRepository.orders(id).create(order);
  }

  @patch('/customers/{id}/orders', {
    responses: {
      '200': {
        description: 'Customers.Order PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {partial: true}),
        },
      },
    })
    order: Partial<Order>,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.customersRepository.orders(id).patch(order, where);
  }

  @del('/customers/{id}/orders', {
    responses: {
      '200': {
        description: 'Customers.Order DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.customersRepository.orders(id).delete(where);
  }
}
