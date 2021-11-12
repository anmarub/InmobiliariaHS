import {Entity, model, property} from '@loopback/repository';

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
  id_customer: string;

  @property({
    type: 'string',
    required: true,
  })
  id_product: string;

  @property({
    type: 'string',
    required: true,
  })
  id_employee: string;

  @property({
    type: 'string',
    required: true,
  })
  id_status: string;

  @property({
    type: 'string',
  })
  comments?: string;


  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
