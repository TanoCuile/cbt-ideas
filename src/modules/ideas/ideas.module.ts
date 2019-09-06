import { Module } from '@nestjs/common';

import { IdeasService } from './services/ideas.service';
import { IdeasController } from './controllers/ideas.controller';
import { DbModule } from '../db/db.module';
import { IdeasDBService } from '../db/services/ideas.db.service';
import { UserAuthService } from '../user/services/user.auth.service';
import { IdeasSubscriber } from './services/subscriber.service';
import { NotificationModule } from '../notifications/notification.module';

@Module({
  imports: [DbModule, NotificationModule],
  controllers: [IdeasController],
  providers: [IdeasService, IdeasDBService, UserAuthService, IdeasSubscriber],
})
export class IdeasModule {}
