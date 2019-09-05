import { Module } from '@nestjs/common';
import { WebController } from './controllers/web.controller';

@Module({
  imports: [],
  controllers: [WebController],
  providers: [],
})
export class WebModule {}
