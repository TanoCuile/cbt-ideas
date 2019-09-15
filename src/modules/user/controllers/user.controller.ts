import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../services/user.service';
import { UserInterface } from '../interfaces/user.interface';

@Controller('/api/user')
@UseGuards(AuthGuard('token'))
export class UserController {
  constructor(
    @Inject('UserService') protected readonly userService: UserService,
  ) {}
  @Get()
  async get(@Req() req: Request) {
    return this.userService.getInfoFromUserModels([
      req.user as UserInterface,
    ])[0];
  }
}
