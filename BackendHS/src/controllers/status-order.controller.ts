import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {StatusOrder} from '../models';
import {StatusOrderRepository} from '../repositories';

export class StatusOrderController {
  constructor(
    @repository(StatusOrderRepository)
    public statusOrderRepository : StatusOrderRepository,
  ) {}

  @post('/status-orders')
  @response(200, {
    description: 'StatusOrder model instance',
    content: {'application/json': {schema: getModelSchemaRef(StatusOrder)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StatusOrder, {
            title: 'NewStatusOrder',
            exclude: ['id'],
          }),
        },
      },
    })
    statusOrder: Omit<StatusOrder, 'id'>,
  ): Promise<StatusOrder> {
    return this.statusOrderRepository.create(statusOrder);
  }

  @get('/status-orders/count')
  @response(200, {
    description: 'StatusOrder model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(StatusOrder) where?: Where<StatusOrder>,
  ): Promise<Count> {
    return this.statusOrderRepository.count(where);
  }

  @get('/status-orders')
  @response(200, {
    description: 'Array of StatusOrder model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(StatusOrder, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(StatusOrder) filter?: Filter<StatusOrder>,
  ): Promise<StatusOrder[]> {
    return this.statusOrderRepository.find(filter);
  }

  @patch('/status-orders')
  @response(200, {
    description: 'StatusOrder PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StatusOrder, {partial: true}),
        },
      },
    })
    statusOrder: StatusOrder,
    @param.where(StatusOrder) where?: Where<StatusOrder>,
  ): Promise<Count> {
    return this.statusOrderRepository.updateAll(statusOrder, where);
  }

  @get('/status-orders/{id}')
  @response(200, {
    description: 'StatusOrder model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(StatusOrder, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(StatusOrder, {exclude: 'where'}) filter?: FilterExcludingWhere<StatusOrder>
  ): Promise<StatusOrder> {
    return this.statusOrderRepository.findById(id, filter);
  }

  @patch('/status-orders/{id}')
  @response(204, {
    description: 'StatusOrder PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StatusOrder, {partial: true}),
        },
      },
    })
    statusOrder: StatusOrder,
  ): Promise<void> {
    await this.statusOrderRepository.updateById(id, statusOrder);
  }

  @put('/status-orders/{id}')
  @response(204, {
    description: 'StatusOrder PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() statusOrder: StatusOrder,
  ): Promise<void> {
    await this.statusOrderRepository.replaceById(id, statusOrder);
  }

  @del('/status-orders/{id}')
  @response(204, {
    description: 'StatusOrder DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.statusOrderRepository.deleteById(id);
  }
}
