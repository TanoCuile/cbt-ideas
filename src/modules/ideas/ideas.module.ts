import { Module } from '@nestjs/common';

import { IdeasService } from './services/ideas.service';
import { IdeasController } from './controllers/ideas.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [IdeasController],
  providers: [IdeasService],
})
export class IdeasModule {}
