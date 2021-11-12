import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TypeProperty, TypePropertyRelations} from '../models';

export class TypePropertyRepository extends DefaultCrudRepository<
  TypeProperty,
  typeof TypeProperty.prototype.id,
  TypePropertyRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(TypeProperty, dataSource);
  }
}
