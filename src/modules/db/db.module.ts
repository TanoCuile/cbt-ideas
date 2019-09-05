import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Idea } from './models/idea.model';
import { IdeasDBService } from './services/ideas.db.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://database:27017/ideas',
      useNewUrlParser: true,
      entities: [
        Idea
      ],
      // url: 'mongodb://root:example@db:27017'
      // host: 'db',
      // port: 27017,
      // database: 'ideas',
      // username: 'root',
      // password: 'example',
    }),
    TypeOrmModule.forFeature([Idea])
  ],
  controllers: [],
  providers: [IdeasDBService],
  exports: [IdeasDBService, TypeOrmModule]
})
export class DbModule {}
