import { Module } from '@nestjs/common';
import { WebController } from './modules/web/controllers/web.controller';
import { UserModule } from './modules/user/user.module';
import { IdeasModule } from './modules/ideas/ideas.module';
import { CommentsModule } from './modules/comments/comments.module';
import { DbModule } from './modules/db/db.module';
import { WebService } from './modules/web/services/web.service';

@Module({
  imports: [UserModule, IdeasModule, CommentsModule, DbModule],
  controllers: [WebController],
  providers: [WebService],
})
export class AppModule {}
