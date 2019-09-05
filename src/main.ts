import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { resolve } from 'path';
import { FixturesProvider } from './modules/fixtures/providers/fixtures.provider';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(resolve(process.cwd(), 'static'), {
    extensions: ['js', 'css'],
    prefix: '/static',
  });

  const options = new DocumentBuilder()
    .setTitle('CBT|TMP ideas')
    .setDescription('CBT|TMP ideas forum')
    .setVersion('1.0')
    .addTag('idea')
    .addTag('idea_mock')
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
