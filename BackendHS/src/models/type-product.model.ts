import {Entity, model, property} from '@loopback/repository';

@model()
export class TypeProduct extends Entity {
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


  constructor(data?: Partial<TypeProduct>) {
    super(data);
  }
}

export interface TypeProductRelations {
  // describe navigational properties here
}

export type TypeProductWithRelations = TypeProduct & TypeProductRelations;
