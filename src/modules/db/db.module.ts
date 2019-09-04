import { Module } from '@nestjs/common';
import { mongoProvider } from './providers/mongo.provider';
import { IdeasService } from './services/ideas.service';
import { ideasRepositoryProvider } from './providers/ideas.repository.provider';

@Module({
  imports: [],
  controllers: [],
  providers: [mongoProvider, ideasRepositoryProvider, IdeasService],
  exports: [IdeasService],
})
export class DbModule {}
