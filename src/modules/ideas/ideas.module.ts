import { Module } from '@nestjs/common';

import { IdeasService } from './services/ideas.service';
import { IdeasController } from './controllers/ideas.controller';

@Module({
  imports: [],
  controllers: [IdeasController],
  providers: [IdeasService],
  exports:
})
export class IdeasModule {}
