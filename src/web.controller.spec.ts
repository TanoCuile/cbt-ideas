import { Test, TestingModule } from '@nestjs/testing';
import { WebController } from './web.controller';
import { readFileSync } from 'fs';
import { resolve } from 'path';

describe('AppController', () => {
  let webController: WebController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WebController],
      providers: [],
    }).compile();

    webController = app.get<WebController>(WebController);
  });

  describe('root', () => {
    it('should return html', () => {
      expect(webController.getHello()).toBe(readFileSync(resolve(process.cwd(), 'static', 'index.html')).toString());
    });
  });
});
