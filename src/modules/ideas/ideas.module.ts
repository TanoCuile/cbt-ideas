import { Module } from '@nestjs/common';

import { IdeasService } from './services/ideas.service';
import { IdeasController } from './controllers/ideas.controller';
import { DbModule } from '../db/db.module';
import { IdeasDBService } from '../db/services/ideas.db.service';
import { UserAuthService } from '../user/services/user.auth.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [DbModule, UserModule],
  controllers: [IdeasController],
  providers: [IdeasService, IdeasDBService, UserAuthService],
})
export class IdeasModule {}
