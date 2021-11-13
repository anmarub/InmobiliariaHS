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
  StatusOrder,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderStatusOrderController {
  constructor(
    @repository(OrderRepository)
    public orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/status-order', {
    responses: {
      '200': {
        description: 'StatusOrder belonging to Order',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(StatusOrder)},
          },
        },
      },
    },
  })
  async getStatusOrder(
    @param.path.string('id') id: typeof Order.prototype.id,
  ): Promise<StatusOrder> {
    return this.orderRepository.statusOrder(id);
  }
}
