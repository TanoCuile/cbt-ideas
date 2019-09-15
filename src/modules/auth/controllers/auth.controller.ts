import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('/auth')
export class OauthController {
  constructor() {}

  @Get('/tmp')
  @UseGuards(AuthGuard('oauth2'))
  tmpLogin() {}

  @UseGuards(AuthGuard('oauth2'))
  @Get('tmp/callback')
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    console.log(req.user);
    res.cookie('ct_tok', 'abcd', {
      path: '/',
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.redirect('/');
    // const loginResult = await this.authService.login(req.user);
    // res.redirect(`/auth/oauth2/callback?accessToken=${loginResult.accessToken}`);
  }
}
