import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TypeProduct, TypeProductRelations} from '../models';

export class TypeProductRepository extends DefaultCrudRepository<
  TypeProduct,
  typeof TypeProduct.prototype.id,
  TypeProductRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(TypeProduct, dataSource);
  }
}
