import { Module } from '@nestjs/common';
import { MailService } from './services/mail.service';
import { DbModule } from '../db/db.module';
import { CommentsSubscriber } from './services/comment.subscriber.service';
import { IdeasSubscriber } from './services/idea.subscriber.service.interface';
import { MailTemplateService } from './services/mail-template.service';

@Module({
  imports: [DbModule],
  providers: [MailService, MailTemplateService, IdeasSubscriber, CommentsSubscriber],
  exports: [MailService],
})
export class NotificationModule {}
