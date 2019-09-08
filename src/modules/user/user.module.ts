import { Module } from '@nestjs/common';
import { UserAuthService } from './services/user.auth.service';
import { DbModule } from '../db/db.module';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [DbModule],
  controllers: [UserController],
  providers: [UserAuthService],
  exports: [UserAuthService],
})
export class UserModule {}
