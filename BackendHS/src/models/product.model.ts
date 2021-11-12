import {Entity, model, property} from '@loopback/repository';

@model()
export class Product extends Entity {
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
  code: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  cost: number;

  @property({
    type: 'string',
    required: true,
  })
  type_product: string;

  @property({
    type: 'string',
    required: true,
  })
  type_property: string;

  @property({
    type: 'string',
    required: true,
  })
  link_photo: string;

  @property({
    type: 'string',
    required: true,
  })
  id_employee: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;


  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
