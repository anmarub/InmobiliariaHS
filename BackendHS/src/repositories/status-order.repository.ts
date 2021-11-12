import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {StatusOrder, StatusOrderRelations} from '../models';

export class StatusOrderRepository extends DefaultCrudRepository<
  StatusOrder,
  typeof StatusOrder.prototype.id,
  StatusOrderRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(StatusOrder, dataSource);
  }
}
