import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Customers} from './customers.model';
import {Product} from './product.model';
import {StatusOrder} from './status-order.model';

@model()
export class Order extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  id_employee: string;

  @property({
    type: 'string',
  })
  comments?: string;

  @belongsTo(() => Customers)
  customersId: string;

  @belongsTo(() => Product)
  productId: string;

  @belongsTo(() => StatusOrder)
  statusOrderId: string;

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
