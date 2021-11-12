import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Product,
  TypeProperty,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductTypePropertyController {
  constructor(
    @repository(ProductRepository)
    public productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/type-property', {
    responses: {
      '200': {
        description: 'TypeProperty belonging to Product',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TypeProperty)},
          },
        },
      },
    },
  })
  async getTypeProperty(
    @param.path.string('id') id: typeof Product.prototype.id,
  ): Promise<TypeProperty> {
    return this.productRepository.typeProperty(id);
  }
}
