import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Employee, EmployeeRelations, TypeIdentification} from '../models';
import {TypeIdentificationRepository} from './type-identification.repository';

export class EmployeeRepository extends DefaultCrudRepository<
  Employee,
  typeof Employee.prototype.id,
  EmployeeRelations
> {

  public readonly typeIdentification: BelongsToAccessor<TypeIdentification, typeof Employee.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('TypeIdentificationRepository') protected typeIdentificationRepositoryGetter: Getter<TypeIdentificationRepository>,
  ) {
    super(Employee, dataSource);
    this.typeIdentification = this.createBelongsToAccessorFor('typeIdentification', typeIdentificationRepositoryGetter,);
    this.registerInclusionResolver('typeIdentification', this.typeIdentification.inclusionResolver);
  }
}
