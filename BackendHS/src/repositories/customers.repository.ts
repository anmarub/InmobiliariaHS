import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Customers, CustomersRelations, Order, TypeIdentification, UserCredentials} from '../models';
import {OrderRepository} from './order.repository';
import {TypeIdentificationRepository} from './type-identification.repository';
import {UserCredentialsRepository} from './user-credentials.repository';

export type CredentialsCustomer = {
  email: string;
  password: string;
  role?: string[];
}
export class CustomersRepository extends DefaultCrudRepository<
  Customers,
  typeof Customers.prototype.id,
  CustomersRelations
> {

  public readonly orders: HasManyRepositoryFactory<Order, typeof Customers.prototype.id>;

  public readonly typeIdentification: BelongsToAccessor<TypeIdentification, typeof Customers.prototype.id>;

  public readonly CustomerCredentials: HasOneRepositoryFactory<UserCredentials, typeof Customers.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>, @repository.getter('TypeIdentificationRepository') protected typeIdentificationRepositoryGetter: Getter<TypeIdentificationRepository>, @repository.getter('UserCredentialsRepository') protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>,
  ) {
    super(Customers, dataSource);
    this.CustomerCredentials = this.createHasOneRepositoryFactoryFor('CustomerCredentials', userCredentialsRepositoryGetter);
    this.registerInclusionResolver('CustomerCredentials', this.CustomerCredentials.inclusionResolver);
    this.typeIdentification = this.createBelongsToAccessorFor('typeIdentification', typeIdentificationRepositoryGetter,);
    this.registerInclusionResolver('typeIdentification', this.typeIdentification.inclusionResolver);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', orderRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }

    //Metodo para devolver la credenciales del usuario
    async findCredentials(
      userId: typeof Customers.prototype.id, //Pasamos id del usuario
    ): Promise<UserCredentials | undefined> {
      try {
        return await this.CustomerCredentials(userId).get(); //devuelve el usuario
      } catch (err) {
        if (err.code === 'ENTITY_NOT_FOUND') {
          return undefined;
        }
        throw err;
      }
    }
}
