import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { IdeasModule } from './modules/ideas/ideas.module';
import { CommentsModule } from './modules/comments/comments.module';
import { DbModule } from './modules/db/db.module';
import { FixturesModule } from './modules/fixtures/fixtures.module';
import { NotificationModule } from './modules/notifications/notification.module';
import { PassportModule } from '@nestjs/passport';
import { WebModule } from './modules/web/web.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    WebModule,
    PassportModule.register({ defaultStrategy: 'token' }),
    UserModule,
    AuthModule,
    IdeasModule,
    CommentsModule,
    DbModule,
    FixturesModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
