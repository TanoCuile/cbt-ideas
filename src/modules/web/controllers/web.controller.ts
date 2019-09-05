import { Controller, Get, Param, Inject } from '@nestjs/common';
import { resolve } from 'path';
import * as ejs from 'ejs';
import { WebService } from '../services/web.service';

@Controller()
export class WebController {
  constructor(@Inject(WebService) protected webService: WebService) {}

  @Get('/')
  async getIndex(): Promise<string> {
    return ejs.renderFile(
      resolve(this.webService.getAbsoluteStaticPath(), 'index.html.ejs'),
      {
        scripts: [this.webService.getAppScript()],
      },
    );
  }

  @Get('/ideas/*')
  async getIdeas() {
    return this.getIndex();
  }

  @Get('/ideas*')
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
