import { Module } from '@nestjs/common';
import { mongoProvider } from './providers/mongo.provider';
import { IdeasDBService } from './services/ideas.db.service';
import { ideasRepositoryProvider } from './providers/ideas.repository.provider';
import { FixturesProvider } from '../fixtures/providers/fixtures.provider';
import { ClassProvider } from '@nestjs/common/interfaces';
import { commentsRepositoryProvider } from './providers/comments.repository.provider';
import { usersRepositoryProvider } from './providers/users.repository.provider';
import { CommentsDBService } from './services/comments.db.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    mongoProvider,
    ideasRepositoryProvider,
    commentsRepositoryProvider,
    usersRepositoryProvider,
    {
      provide: 'IdeasDBService',
      useClass: IdeasDBService,
    } as ClassProvider<IdeasDBService>,
    {
      provide: 'CommentsDBService',
      useClass: CommentsDBService,
    } as ClassProvider<CommentsDBService>,
  ],
  exports: [
    'IdeasDBService',
    'CommentsDBService',
    'IDEAS_REPOSITORY',
    'COMMENTS_REPOSITORY',
    'USERS_REPOSITORY',
    'MONGO_DB_CONNECTION'
  ],
})
export class DbModule {}
