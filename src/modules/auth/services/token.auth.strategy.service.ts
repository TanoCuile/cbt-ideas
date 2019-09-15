import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { UserAuthService } from './user.auth.service';
import { CookieTokenStategy } from '../strategies/cookie-token.stragegy';

@Injectable()
export class UniqueTockenAuthStrategyService extends PassportStrategy(
  CookieTokenStategy,
  'token',
) {
  constructor(
    @Inject(UserAuthService) private readonly authService: UserAuthService,
  ) {
    super();
  }

  async validate(token: string) {
    return await this.authService.getUserByToken(token);
  }
}
