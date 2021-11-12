import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Business, BusinessRelations} from '../models';

export class BusinessRepository extends DefaultCrudRepository<
  Business,
  typeof Business.prototype.id,
  BusinessRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Business, dataSource);
  }
}
