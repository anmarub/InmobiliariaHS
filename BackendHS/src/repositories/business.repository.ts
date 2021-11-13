import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Business, BusinessRelations, TypeIdentification} from '../models';
import {TypeIdentificationRepository} from './type-identification.repository';

export class BusinessRepository extends DefaultCrudRepository<
  Business,
  typeof Business.prototype.id,
  BusinessRelations
> {

  public readonly typeIdentification: BelongsToAccessor<TypeIdentification, typeof Business.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('TypeIdentificationRepository') protected typeIdentificationRepositoryGetter: Getter<TypeIdentificationRepository>,
  ) {
    super(Business, dataSource);
    this.typeIdentification = this.createBelongsToAccessorFor('typeIdentification', typeIdentificationRepositoryGetter,);
    this.registerInclusionResolver('typeIdentification', this.typeIdentification.inclusionResolver);
  }
}
