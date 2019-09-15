import { Module } from '@nestjs/common';
import { UserAuthService } from './services/user.auth.service';
import { DbModule } from '../db/db.module';
import { OauthController } from './controllers/auth.controller';
import { OAuth2AuthStrategyService } from './services/oauth2.auth.strategy.service';
import { UniqueTockenAuthStrategyService } from './services/token.auth.strategy.service';

@Module({
  imports: [DbModule],
  controllers: [ OauthController],
  providers: [
    UserAuthService,
    OAuth2AuthStrategyService,
    UniqueTockenAuthStrategyService,
  ],
  exports: [
    UserAuthService,
    OAuth2AuthStrategyService,
    UniqueTockenAuthStrategyService,
  ],
})
export class AuthModule {}
