import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IdeasController } from './controllers/ideas.controller';
import { IdeasService } from './services/ideas.service';
import { Idea } from '../db/models/idea.model';

@Module({
  imports: [TypeOrmModule.forFeature([Idea])],
  controllers: [IdeasController],
  providers: [IdeasService],
})
export class IdeasModule {}
