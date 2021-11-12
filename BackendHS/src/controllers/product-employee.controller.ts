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
  Employee,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductEmployeeController {
  constructor(
    @repository(ProductRepository)
    public productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/employee', {
    responses: {
      '200': {
        description: 'Employee belonging to Product',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Employee)},
          },
        },
      },
    },
  })
  async getEmployee(
    @param.path.string('id') id: typeof Product.prototype.id,
  ): Promise<Employee> {
    return this.productRepository.employee(id);
  }
}
