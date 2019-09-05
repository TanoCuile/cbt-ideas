import { createConnection } from 'typeorm';
import { FactoryProvider } from '@nestjs/common/interfaces';
import { Idea } from '../models/idea.model';

export const mongoProvider = {
  provide: 'MONGO_DB_CONNECTION',
  useFactory: async () =>
    createConnection({
      type: 'mongodb',
      entities: [Idea],
      useNewUrlParser: true,
      url: 'mongodb://database:27017/ideas',
      // url: 'mongodb://root:example@db:27017'
      // host: 'db',
      // port: 27017,
      // database: 'ideas',
      // username: 'root',
      // password: 'example',
    }),
} as FactoryProvider;
