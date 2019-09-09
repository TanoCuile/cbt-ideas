import { Module } from '@nestjs/common';

import { CommentsService } from './services/comments.service';
import { CommentsController } from './controllers/comments.controller';
import { DbModule } from '../db/db.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [DbModule, UserModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
