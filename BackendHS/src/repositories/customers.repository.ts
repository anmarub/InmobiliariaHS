import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Customers, CustomersRelations, Order, TypeIdentification} from '../models';
import {OrderRepository} from './order.repository';
import {TypeIdentificationRepository} from './type-identification.repository';

export class CustomersRepository extends DefaultCrudRepository<
  Customers,
  typeof Customers.prototype.id,
  CustomersRelations
> {

  public readonly orders: HasManyRepositoryFactory<Order, typeof Customers.prototype.id>;

  public readonly typeIdentification: BelongsToAccessor<TypeIdentification, typeof Customers.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>, @repository.getter('TypeIdentificationRepository') protected typeIdentificationRepositoryGetter: Getter<TypeIdentificationRepository>,
  ) {
    super(Customers, dataSource);
    this.typeIdentification = this.createBelongsToAccessorFor('typeIdentification', typeIdentificationRepositoryGetter,);
    this.registerInclusionResolver('typeIdentification', this.typeIdentification.inclusionResolver);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', orderRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}
