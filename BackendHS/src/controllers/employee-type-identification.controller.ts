import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Employee,
  TypeIdentification,
} from '../models';
import {EmployeeRepository} from '../repositories';

export class EmployeeTypeIdentificationController {
  constructor(
    @repository(EmployeeRepository)
    public employeeRepository: EmployeeRepository,
  ) { }

  @get('/employees/{id}/type-identification', {
    responses: {
      '200': {
        description: 'TypeIdentification belonging to Employee',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TypeIdentification)},
          },
        },
      },
    },
  })
  async getTypeIdentification(
    @param.path.string('id') id: typeof Employee.prototype.id,
  ): Promise<TypeIdentification> {
    return this.employeeRepository.typeIdentification(id);
  }
}
