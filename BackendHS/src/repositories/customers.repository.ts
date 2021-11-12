import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Customers, CustomersRelations} from '../models';

export class CustomersRepository extends DefaultCrudRepository<
  Customers,
  typeof Customers.prototype.id,
  CustomersRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Customers, dataSource);
  }
}
