import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Order,
  Customers,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderCustomersController {
  constructor(
    @repository(OrderRepository)
    public orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/customers', {
    responses: {
      '200': {
        description: 'Customers belonging to Order',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Customers)},
          },
        },
      },
    },
  })
  async getCustomers(
    @param.path.string('id') id: typeof Order.prototype.id,
  ): Promise<Customers> {
    return this.orderRepository.customers(id);
  }
}
