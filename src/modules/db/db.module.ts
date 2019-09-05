import { Module } from '@nestjs/common';
import { mongoProvider } from './providers/mongo.provider';
import { IdeasDBService } from './services/ideas.db.service';
import { ideasRepositoryProvider } from './providers/ideas.repository.provider';
import { FixturesProvider } from './providers/fixtures.provider';
import { ClassProvider } from '@nestjs/common/interfaces';
import { commentsRepositoryProvider } from './providers/comments.repository.provider';
import { usersRepositoryProvider } from './providers/users.repository.provider';

@Module({
  imports: [],
  controllers: [],
  providers: [
    mongoProvider,
    ideasRepositoryProvider,
    commentsRepositoryProvider,
    usersRepositoryProvider,
    {
      provide: 'FIXTURES_PROVIDER',
      useClass: FixturesProvider,
    } as ClassProvider<FixturesProvider>,
    {
      provide: 'IdeasDBService',
      useClass: IdeasDBService,
    } as ClassProvider<IdeasDBService>,
  ],
  exports: ['IdeasDBService', 'FIXTURES_PROVIDER'],
})
export class DbModule {}
