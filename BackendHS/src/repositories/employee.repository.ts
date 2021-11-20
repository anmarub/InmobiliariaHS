import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Employee, EmployeeRelations, TypeIdentification, UserCredentials} from '../models';
import {TypeIdentificationRepository} from './type-identification.repository';
import {UserCredentialsRepository} from './user-credentials.repository';

export type CredentialsE = {
  email: string;
  password: string;
  role?: string[];
}
export class EmployeeRepository extends DefaultCrudRepository<
  Employee,
  typeof Employee.prototype.id,
  EmployeeRelations
> {

  public readonly typeIdentification: BelongsToAccessor<TypeIdentification, typeof Employee.prototype.id>;

  public readonly employeeCredentials: HasOneRepositoryFactory<UserCredentials, typeof Employee.prototype.id>;


  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('TypeIdentificationRepository') protected typeIdentificationRepositoryGetter: Getter<TypeIdentificationRepository>, @repository.getter('UserCredentialsRepository') protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>,
  ) {
    super(Employee, dataSource);
    this.employeeCredentials = this.createHasOneRepositoryFactoryFor('employeeCredentials', userCredentialsRepositoryGetter);
    this.registerInclusionResolver('employeeCredentials', this.employeeCredentials.inclusionResolver);
    this.typeIdentification = this.createBelongsToAccessorFor('typeIdentification', typeIdentificationRepositoryGetter,);
    this.registerInclusionResolver('typeIdentification', this.typeIdentification.inclusionResolver);
  }

  //Metodo para devolver la credenciales del usuario
  async findCredentials(
    userId: typeof Employee.prototype.id, //Pasamos id del usuario
  ): Promise<UserCredentials | undefined> {
    try {
      return await this.employeeCredentials(userId).get(); //devuelve el usuario
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
