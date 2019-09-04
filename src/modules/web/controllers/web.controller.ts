import { Controller, Get, Param, Inject } from '@nestjs/common';
import { resolve } from 'path';
import * as ejs from 'ejs';
import { WebService } from '../services/web.service';

@Controller()
export class WebController {
  constructor(@Inject(WebService) protected webService: WebService) {}

  @Get('/')
  @Get('/ideas/*')
  @Get('/question/*')
  async getIndex(): Promise<string> {
    return ejs.renderFile(
      resolve(this.webService.getAbsoluteStaticPath(), 'index.html.ejs'),
      {
        scripts: [this.webService.getAppScript()],
      },
    );
  }
}
