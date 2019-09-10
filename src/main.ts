import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { resolve } from 'path';
import { FixturesProvider } from './modules/fixtures/providers/fixtures.provider';
import * as cookieParser from 'cookie-parser';
import { API_TITLE, API_DESCRIPTION } from './constants';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.useStaticAssets(resolve(process.cwd(), 'static'), {
    extensions: ['js', 'css'],
    prefix: '/static',
  });

  const options = new DocumentBuilder()
    .setTitle(API_TITLE)
    .setDescription(API_DESCRIPTION)
    .setVersion('1.0')
    .addTag('idea')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const fixturesProvider = app.get<FixturesProvider>('FIXTURES_PROVIDER');

  if (await fixturesProvider.shouldImportFixtures()) {
    if (await fixturesProvider.import()) {
      console.log('Fixtures loaded');
    } else {
      console.error('Fixtures not loaded');
    }
  }

  await app.listen(3000);
}
bootstrap();
