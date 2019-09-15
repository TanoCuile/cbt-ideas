import { Controller, Get, Param, Inject, UseGuards } from '@nestjs/common';
import { resolve } from 'path';
import * as ejs from 'ejs';
import { WebService } from '../services/web.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class WebController {
  constructor(@Inject(WebService) protected webService: WebService) {}

  @Get('/')
  async getIndex(): Promise<string> {
    return ejs.renderFile(
      resolve(this.webService.getAbsoluteStaticPath(), 'index.html.ejs'),
      {
        scripts: [this.webService.getAppScript()].filter(i => !!i),
      },
    );
  }

  @UseGuards(AuthGuard('token'))
  @Get('/ideas*')
  async getIdeas() {
    return this.getIndex();
  }

  @Get('/idea/*')
  async getIdea() {
    return this.getIndex();
  }

  @Get('/question')
  async getQuestion() {
    return this.getIndex();
  }

  @Get('/question/*')
  async getQuestions() {
    return this.getIndex();
  }
}
