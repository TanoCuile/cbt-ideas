import { Module } from '@nestjs/common';

import { IdeasController } from './controllers/ideas.controller';
import { IdeasService } from './services/ideas.service';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [IdeasController],
  providers: [IdeasService],
})
export class IdeasModule {}
