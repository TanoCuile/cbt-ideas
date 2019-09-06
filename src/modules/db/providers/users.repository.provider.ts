import { FactoryProvider } from '@nestjs/common/interfaces';
import { Connection } from 'typeorm';
import { User } from '../models/user.model';

export const usersRepositoryProvider = {
  provide: 'USERS_REPOSITORY',
  useFactory: (connection: Connection) => connection.getMongoRepository(User),
  inject: ['MONGO_DB_CONNECTION'],
} as FactoryProvider;
