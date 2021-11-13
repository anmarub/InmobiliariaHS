import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Customers,
  TypeIdentification,
} from '../models';
import {CustomersRepository} from '../repositories';

export class CustomersTypeIdentificationController {
  constructor(
    @repository(CustomersRepository)
    public customersRepository: CustomersRepository,
  ) { }

  @get('/customers/{id}/type-identification', {
    responses: {
      '200': {
        description: 'TypeIdentification belonging to Customers',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TypeIdentification)},
          },
        },
      },
    },
  })
  async getTypeIdentification(
    @param.path.string('id') id: typeof Customers.prototype.id,
  ): Promise<TypeIdentification> {
    return this.customersRepository.typeIdentification(id);
  }
}
