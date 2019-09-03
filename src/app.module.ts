import { Module } from '@nestjs/common';
import { WebController } from './web.controller';
import { UserModule } from './modules/user/user.module';
import { IdeasModule } from './modules/ideas/ideas.module';
import { CommentsModule } from './modules/comments/comments.module';
import { DbModule } from './modules/db/db.module';

@Module({
  imports: [UserModule, IdeasModule, CommentsModule, DbModule],
  controllers: [WebController],
  providers: [],
})
export class AppModule {}
