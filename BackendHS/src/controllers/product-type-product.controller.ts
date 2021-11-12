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
  TypeProduct,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductTypeProductController {
  constructor(
    @repository(ProductRepository)
    public productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/type-product', {
    responses: {
      '200': {
        description: 'TypeProduct belonging to Product',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TypeProduct)},
          },
        },
      },
    },
  })
  async getTypeProduct(
    @param.path.string('id') id: typeof Product.prototype.id,
  ): Promise<TypeProduct> {
    return this.productRepository.typeProduct(id);
  }
}
