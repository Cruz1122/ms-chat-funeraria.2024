import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Sala, SalaRelations} from '../models';

export class SalaRepository extends DefaultCrudRepository<
  Sala,
  typeof Sala.prototype._id,
  SalaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Sala, dataSource);
  }
}
