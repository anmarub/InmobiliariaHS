import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Order, OrderRelations, Customers, Product, StatusOrder} from '../models';
import {CustomersRepository} from './customers.repository';
import {ProductRepository} from './product.repository';
import {StatusOrderRepository} from './status-order.repository';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.id,
  OrderRelations
> {

  public readonly customers: BelongsToAccessor<Customers, typeof Order.prototype.id>;

  public readonly product: BelongsToAccessor<Product, typeof Order.prototype.id>;

  public readonly statusOrder: BelongsToAccessor<StatusOrder, typeof Order.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CustomersRepository') protected customersRepositoryGetter: Getter<CustomersRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>, @repository.getter('StatusOrderRepository') protected statusOrderRepositoryGetter: Getter<StatusOrderRepository>,
  ) {
    super(Order, dataSource);
    this.statusOrder = this.createBelongsToAccessorFor('statusOrder', statusOrderRepositoryGetter,);
    this.registerInclusionResolver('statusOrder', this.statusOrder.inclusionResolver);
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter,);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
    this.customers = this.createBelongsToAccessorFor('customers', customersRepositoryGetter,);
    this.registerInclusionResolver('customers', this.customers.inclusionResolver);
  }
}
