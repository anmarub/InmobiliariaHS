import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Business,
  TypeIdentification,
} from '../models';
import {BusinessRepository} from '../repositories';

export class BusinessTypeIdentificationController {
  constructor(
    @repository(BusinessRepository)
    public businessRepository: BusinessRepository,
  ) { }

  @get('/businesses/{id}/type-identification', {
    responses: {
      '200': {
        description: 'TypeIdentification belonging to Business',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TypeIdentification)},
          },
        },
      },
    },
  })
  async getTypeIdentification(
    @param.path.string('id') id: typeof Business.prototype.id,
  ): Promise<TypeIdentification> {
    return this.businessRepository.typeIdentification(id);
  }
}
