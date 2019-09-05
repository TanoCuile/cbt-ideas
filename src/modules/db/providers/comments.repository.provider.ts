import { FactoryProvider } from '@nestjs/common/interfaces';
import { Connection } from 'typeorm';
import { Idea } from '../models/idea.model';

export const commentsRepositoryProvider = {
  provide: 'COMMENTS_REPOSITORY',
  useFactory: (connection: Connection) => connection.getMongoRepository(Idea),
  inject: ['MONGO_DB_CONNECTION'],
} as FactoryProvider;
