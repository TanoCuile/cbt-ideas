import * as oauth2 from 'passport-oauth2';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { UserAuthService } from './user.auth.service';
import {
  TMP_AUTH_URL,
  TMP_TOKEN_URL,
  TMP_CLIENT_ID,
  TMP_CLIENT_SECRET,
  OAUTH_CALLBACK_URL,
} from '../../../constants';
import { VerifyCallback } from 'passport-oauth2';

@Injectable()
export class OAuth2AuthStrategyService extends PassportStrategy(
  oauth2.Strategy,
  'oauth2',
) {
  constructor(
    @Inject(UserAuthService) private readonly authService: UserAuthService,
  ) {
    super({
      authorizationURL: TMP_AUTH_URL,
      tokenURL: TMP_TOKEN_URL,
      clientID: TMP_CLIENT_ID,
      clientSecret: TMP_CLIENT_SECRET,
      callbackURL: OAUTH_CALLBACK_URL,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    verified: VerifyCallback,
  ) {
    console.log('>>>', accessToken, refreshToken, profile, verified, arguments);
    const user = { e: 2 }; // await this.authService.validateUser(username, password);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    return verified(null, user);
  }
}
