import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TypeIdentification, TypeIdentificationRelations} from '../models';

export class TypeIdentificationRepository extends DefaultCrudRepository<
  TypeIdentification,
  typeof TypeIdentification.prototype.id,
  TypeIdentificationRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(TypeIdentification, dataSource);
  }
}
