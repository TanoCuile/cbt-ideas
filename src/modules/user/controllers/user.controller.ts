import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { UserAuthService } from '../services/user.auth.service';
import { Request } from 'express';
import { AuthGuard } from '../../../guards/auth.guard';

@Controller('/api/user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(
    @Inject(UserAuthService) protected readonly authService: UserAuthService,
  ) {}
  @Get()
  async get(@Req() req: Request) {
    return this.authService.getUserInfo([
      await this.authService.getUserFromRequest(req),
    ])[0];
  }
}
