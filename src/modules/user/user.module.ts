import { Module } from '@nestjs/common';
import { UserAuthService } from './services/user.auth.service';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [],
  providers: [UserAuthService],
  exports: [UserAuthService],
})
export class UserModule {}
