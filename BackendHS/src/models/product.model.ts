import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Employee} from './employee.model';
import {TypeProduct} from './type-product.model';
import {TypeProperty} from './type-property.model';

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
  link_photo: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @belongsTo(() => TypeProduct)
  typeProductId: string;

  @belongsTo(() => TypeProperty)
  typePropertyId: string;

  @belongsTo(() => Employee)
  employeeId: string;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
