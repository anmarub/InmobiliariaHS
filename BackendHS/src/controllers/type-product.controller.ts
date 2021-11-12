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
import {TypeProduct} from '../models';
import {TypeProductRepository} from '../repositories';

export class TypeProductController {
  constructor(
    @repository(TypeProductRepository)
    public typeProductRepository : TypeProductRepository,
  ) {}

  @post('/type-products')
  @response(200, {
    description: 'TypeProduct model instance',
    content: {'application/json': {schema: getModelSchemaRef(TypeProduct)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TypeProduct, {
            title: 'NewTypeProduct',
            exclude: ['id'],
          }),
        },
      },
    })
    typeProduct: Omit<TypeProduct, 'id'>,
  ): Promise<TypeProduct> {
    return this.typeProductRepository.create(typeProduct);
  }

  @get('/type-products/count')
  @response(200, {
    description: 'TypeProduct model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TypeProduct) where?: Where<TypeProduct>,
  ): Promise<Count> {
    return this.typeProductRepository.count(where);
  }

  @get('/type-products')
  @response(200, {
    description: 'Array of TypeProduct model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TypeProduct, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TypeProduct) filter?: Filter<TypeProduct>,
  ): Promise<TypeProduct[]> {
    return this.typeProductRepository.find(filter);
  }

  @patch('/type-products')
  @response(200, {
    description: 'TypeProduct PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TypeProduct, {partial: true}),
        },
      },
    })
    typeProduct: TypeProduct,
    @param.where(TypeProduct) where?: Where<TypeProduct>,
  ): Promise<Count> {
    return this.typeProductRepository.updateAll(typeProduct, where);
  }

  @get('/type-products/{id}')
  @response(200, {
    description: 'TypeProduct model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TypeProduct, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TypeProduct, {exclude: 'where'}) filter?: FilterExcludingWhere<TypeProduct>
  ): Promise<TypeProduct> {
    return this.typeProductRepository.findById(id, filter);
  }

  @patch('/type-products/{id}')
  @response(204, {
    description: 'TypeProduct PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TypeProduct, {partial: true}),
        },
      },
    })
    typeProduct: TypeProduct,
  ): Promise<void> {
    await this.typeProductRepository.updateById(id, typeProduct);
  }

  @put('/type-products/{id}')
  @response(204, {
    description: 'TypeProduct PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() typeProduct: TypeProduct,
  ): Promise<void> {
    await this.typeProductRepository.replaceById(id, typeProduct);
  }

  @del('/type-products/{id}')
  @response(204, {
    description: 'TypeProduct DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.typeProductRepository.deleteById(id);
  }
}
