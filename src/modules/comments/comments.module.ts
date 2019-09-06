import { Module } from '@nestjs/common';

import { CommentsService } from './services/comments.service';
import { CommentsController } from './controllers/comments.controller';
import { DbModule } from '../db/db.module';
import { CommentsSubscriber } from './services/subscriber.service';
import { NotificationModule } from '../notifications/notification.module';

@Module({
  imports: [DbModule, NotificationModule],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    CommentsSubscriber
  ],
})
export class CommentsModule {}
