import { Module } from '@nestjs/common';

import { CommentsService } from './services/comments.service';
import { CommentsController } from './controllers/comments.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
