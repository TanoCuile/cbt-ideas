// import Strategy from 'passport-unique-token';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { UserAuthService } from './user.auth.service';
import { Request } from 'express';
import { CookieTokenStategy } from '../lib/cookie-token.stragegy';

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
