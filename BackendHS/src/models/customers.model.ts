import {belongsTo, Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Order} from './order.model';
import {TypeIdentification} from './type-identification.model';
import {UserCredentials} from './user-credentials.model';

@model()
export class Customers extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    defaultFn: 'uuidv4',
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  number_identification: string;

  @property({
    type: 'string',
    required: true,
  })
  firtName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'array',
    itemType: 'string',
    nullable: false,
  })
  role: string[];


  @hasMany(() => Order)
  orders: Order[];

  @belongsTo(() => TypeIdentification)
  typeIdentificationId: string;

  @hasOne(() => UserCredentials, {keyTo: 'userId'})
  CustomerCredentials: UserCredentials;

  constructor(data?: Partial<Customers>) {
    super(data);
  }
}

export interface CustomersRelations {
  // describe navigational properties here
}

export type CustomersWithRelations = Customers & CustomersRelations;
