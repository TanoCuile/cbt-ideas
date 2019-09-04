import { Module } from '@nestjs/common';

import { CommentsService } from './services/comments.service';
import { CommentsController } from './controllers/comments.controller';

@Module({
  imports: [],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
