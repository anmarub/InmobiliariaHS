import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Product, ProductRelations, TypeProduct, TypeProperty, Employee} from '../models';
import {TypeProductRepository} from './type-product.repository';
import {TypePropertyRepository} from './type-property.repository';
import {EmployeeRepository} from './employee.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {

  public readonly typeProduct: BelongsToAccessor<TypeProduct, typeof Product.prototype.id>;

  public readonly typeProperty: BelongsToAccessor<TypeProperty, typeof Product.prototype.id>;

  public readonly employee: BelongsToAccessor<Employee, typeof Product.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('TypeProductRepository') protected typeProductRepositoryGetter: Getter<TypeProductRepository>, @repository.getter('TypePropertyRepository') protected typePropertyRepositoryGetter: Getter<TypePropertyRepository>, @repository.getter('EmployeeRepository') protected employeeRepositoryGetter: Getter<EmployeeRepository>,
  ) {
    super(Product, dataSource);
    this.employee = this.createBelongsToAccessorFor('employee', employeeRepositoryGetter,);
    this.registerInclusionResolver('employee', this.employee.inclusionResolver);
    this.typeProperty = this.createBelongsToAccessorFor('typeProperty', typePropertyRepositoryGetter,);
    this.registerInclusionResolver('typeProperty', this.typeProperty.inclusionResolver);
    this.typeProduct = this.createBelongsToAccessorFor('typeProduct', typeProductRepositoryGetter,);
    this.registerInclusionResolver('typeProduct', this.typeProduct.inclusionResolver);
  }
}
