import { Controller, Get } from '@nestjs/common';
import { readFileSync } from 'fs';
import { resolve } from 'path';

@Controller()
export class WebController {
  constructor() {}

  @Get()
  getHello(): string {
    return readFileSync(
      resolve(process.cwd(), 'static', 'index.html'),
    ).toString();
  }
}
