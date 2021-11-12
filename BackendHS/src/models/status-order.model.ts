import {Entity, model, property} from '@loopback/repository';

@model()
export class StatusOrder extends Entity {
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


  constructor(data?: Partial<StatusOrder>) {
    super(data);
  }
}

export interface StatusOrderRelations {
  // describe navigational properties here
}

export type StatusOrderWithRelations = StatusOrder & StatusOrderRelations;
