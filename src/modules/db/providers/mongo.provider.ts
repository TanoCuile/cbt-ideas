import { createConnection } from 'typeorm';
import { FactoryProvider } from '@nestjs/common/interfaces';
import { Idea } from '../models/idea.model';
import { Comment } from '../models/comment.model';
import { User } from '../models/user.model';

export const mongoProvider = {
  provide: 'MONGO_DB_CONNECTION',
  useFactory: async () =>
    createConnection({
      type: 'mongodb',
      entities: [Idea, Comment, User],
      useNewUrlParser: true,
      url: 'mongodb://localhost:27017/ideas',
      // url: 'mongodb://root:example@db:27017'
      // host: 'db',
      // port: 27017,
      // database: 'ideas',
      // username: 'root',
      // password: 'example',
    }),
} as FactoryProvider;
