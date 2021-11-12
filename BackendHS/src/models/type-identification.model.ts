import {Entity, model, property} from '@loopback/repository';

@model()
export class TypeIdentification extends Entity {
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


  constructor(data?: Partial<TypeIdentification>) {
    super(data);
  }
}

export interface TypeIdentificationRelations {
  // describe navigational properties here
}

export type TypeIdentificationWithRelations = TypeIdentification & TypeIdentificationRelations;
