import {Entity, model, property} from '@loopback/repository';

@model()
export class TypeProperty extends Entity {
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


  constructor(data?: Partial<TypeProperty>) {
    super(data);
  }
}

export interface TypePropertyRelations {
  // describe navigational properties here
}

export type TypePropertyWithRelations = TypeProperty & TypePropertyRelations;
