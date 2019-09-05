import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserAuthService } from '../modules/user/services/user.auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('UserAuthService') protected userAuthService: UserAuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userToken = request.headers.usertoken;
    return this.userAuthService.isValidWith(userToken);
  }
}
