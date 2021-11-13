import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {TypeIdentification} from '../models';
import {TypeIdentificationRepository} from '../repositories';

export class TypeIdentificationController {
  constructor(
    @repository(TypeIdentificationRepository)
    public typeIdentificationRepository : TypeIdentificationRepository,
  ) {}

  @post('/type-identifications')
  @response(200, {
    description: 'TypeIdentification model instance',
    content: {'application/json': {schema: getModelSchemaRef(TypeIdentification)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TypeIdentification, {
            title: 'NewTypeIdentification',
            exclude: ['id'],
          }),
        },
      },
    })
    typeIdentification: Omit<TypeIdentification, 'id'>,
  ): Promise<TypeIdentification> {
    return this.typeIdentificationRepository.create(typeIdentification);
  }

  @get('/type-identifications/count')
  @response(200, {
    description: 'TypeIdentification model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TypeIdentification) where?: Where<TypeIdentification>,
  ): Promise<Count> {
    return this.typeIdentificationRepository.count(where);
  }

  @get('/type-identifications')
  @response(200, {
    description: 'Array of TypeIdentification model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TypeIdentification, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TypeIdentification) filter?: Filter<TypeIdentification>,
  ): Promise<TypeIdentification[]> {
    return this.typeIdentificationRepository.find(filter);
  }

  @patch('/type-identifications')
  @response(200, {
    description: 'TypeIdentification PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TypeIdentification, {partial: true}),
        },
      },
    })
    typeIdentification: TypeIdentification,
    @param.where(TypeIdentification) where?: Where<TypeIdentification>,
  ): Promise<Count> {
    return this.typeIdentificationRepository.updateAll(typeIdentification, where);
  }

  @get('/type-identifications/{id}')
  @response(200, {
    description: 'TypeIdentification model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TypeIdentification, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TypeIdentification, {exclude: 'where'}) filter?: FilterExcludingWhere<TypeIdentification>
  ): Promise<TypeIdentification> {
    return this.typeIdentificationRepository.findById(id, filter);
  }

  @patch('/type-identifications/{id}')
  @response(204, {
    description: 'TypeIdentification PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TypeIdentification, {partial: true}),
        },
      },
    })
    typeIdentification: TypeIdentification,
  ): Promise<void> {
    await this.typeIdentificationRepository.updateById(id, typeIdentification);
  }

  @put('/type-identifications/{id}')
  @response(204, {
    description: 'TypeIdentification PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() typeIdentification: TypeIdentification,
  ): Promise<void> {
    await this.typeIdentificationRepository.replaceById(id, typeIdentification);
  }

  @del('/type-identifications/{id}')
  @response(204, {
    description: 'TypeIdentification DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.typeIdentificationRepository.deleteById(id);
  }
}
