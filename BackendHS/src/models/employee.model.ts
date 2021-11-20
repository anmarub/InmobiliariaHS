import {belongsTo, Entity, hasOne, model, property} from '@loopback/repository';
import {TypeIdentification} from './type-identification.model';
import {UserCredentials} from './user-credentials.model';

@model()
export class Employee extends Entity {
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
    type: 'array',
    itemType: 'string',
    nullable: false,
  })
  role: string[];

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    }
  })
  email: string;

  @belongsTo(() => TypeIdentification)
  typeIdentificationId: string;

  @hasOne(() => UserCredentials, {keyTo: 'userId'})
  employeeCredentials : string;


  constructor(data?: Partial<Employee>) {
    super(data);
  }
}

export interface EmployeeRelations {
  // describe navigational properties here
}

export type EmployeeWithRelations = Employee & EmployeeRelations;
