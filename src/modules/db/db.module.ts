import { Module } from '@nestjs/common';
import { mongoProvider } from './providers/mongo.provider';
import { IdeasDBService } from './services/ideas.db.service';
import { ideasRepositoryProvider } from './providers/ideas.repository.provider';
import { ClassProvider } from '@nestjs/common/interfaces';
import { commentsRepositoryProvider } from './providers/comments.repository.provider';
import { usersRepositoryProvider } from './providers/users.repository.provider';
import { CommentsDBService } from './services/comments.db.service';
import { UsersDBService } from './services/users.db.service';

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
    {
      provide: 'UsersDBService',
      useClass: UsersDBService,
    } as ClassProvider<UsersDBService>,
  ],
  exports: [
    'IdeasDBService',
    'CommentsDBService',
    'UsersDBService',
    'IDEAS_REPOSITORY',
    'COMMENTS_REPOSITORY',
    'USERS_REPOSITORY',
    'MONGO_DB_CONNECTION',
  ],
})
export class DbModule {}
