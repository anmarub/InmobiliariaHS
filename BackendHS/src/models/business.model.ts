import {belongsTo, Entity, model, property} from '@loopback/repository';
import {TypeIdentification} from './type-identification.model';

@model()
export class Business extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  number_identification: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @belongsTo(() => TypeIdentification)
  typeIdentificationId: string;

  constructor(data?: Partial<Business>) {
    super(data);
  }
}

export interface BusinessRelations {
  // describe navigational properties here
}

export type BusinessWithRelations = Business & BusinessRelations;
