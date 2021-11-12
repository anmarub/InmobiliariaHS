import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Order, OrderRelations, Customers} from '../models';
import {CustomersRepository} from './customers.repository';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.id,
  OrderRelations
> {

  public readonly customers: BelongsToAccessor<Customers, typeof Order.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CustomersRepository') protected customersRepositoryGetter: Getter<CustomersRepository>,
  ) {
    super(Order, dataSource);
    this.customers = this.createBelongsToAccessorFor('customers', customersRepositoryGetter,);
    this.registerInclusionResolver('customers', this.customers.inclusionResolver);
  }
}
