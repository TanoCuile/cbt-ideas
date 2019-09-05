import { Module } from '@nestjs/common';
import { mongoProvider } from './providers/mongo.provider';
import { IdeasDBService } from './services/ideas.db.service';
import { ideasRepositoryProvider } from './providers/ideas.repository.provider';

@Module({
  imports: [],
  controllers: [],
  providers: [mongoProvider, ideasRepositoryProvider, IdeasDBService],
  exports: [IdeasDBService],
})
export class DbModule {}
