import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [DbModule],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserService',
      useClass: UserService,
    },
  ],
  exports: [
    'UserService'
  ],
})
export class UserModule {}
