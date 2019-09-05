import { Module } from '@nestjs/common';

import { IdeasService } from './services/ideas.service';
import { IdeasController } from './controllers/ideas.controller';
import { DbModule } from '../db/db.module';
import { IdeasDBService } from '../db/services/ideas.db.service';

@Module({
  imports: [DbModule],
  controllers: [IdeasController],
  providers: [IdeasService, IdeasDBService],
})
export class IdeasModule {}
