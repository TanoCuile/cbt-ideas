import { FactoryProvider } from '@nestjs/common/interfaces';
import { Connection } from 'typeorm';
import { Comment } from '../models/comment.model';

export const commentsRepositoryProvider = {
  provide: 'COMMENTS_REPOSITORY',
  useFactory: (connection: Connection) => connection.getMongoRepository(Comment),
  inject: ['MONGO_DB_CONNECTION'],
} as FactoryProvider;
