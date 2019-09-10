import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { resolve } from 'path';
import { FixturesProvider } from './modules/fixtures/providers/fixtures.provider';
import * as cookieParser from 'cookie-parser';
import passport = require("passport");
import OAuth2Strategy = require("passport-oauth2");

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.useStaticAssets(resolve(process.cwd(), 'static'), {
    extensions: ['js', 'css'],
    prefix: '/static',
  });

 passport.use(new OAuth2Strategy({
    authorizationURL: 'http://localhost:3000/oauth/authorize',
    tokenURL: 'http://localhost:3000/oauth/token',
    clientID: 'LdX50fQfw49qFteOlcMdTaZXo_m2VLd6_ZJRv5IaeaE',
    clientSecret: 'ZelIrIVazCtFTbdecSXDHeBYteiKiqZUwK9TfZRWzXk',
    callbackURL: "http://localhost:3006/auth/ideas_forum/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('------------', arguments);
    return {};
  }
));
app.getHttpAdapter().get('/auth/example',
  passport.authenticate('oauth2'));

(app.getHttpAdapter() as any).get('/auth/ideas_forum/callback',
  function() {
    return passport.authenticate('oauth2', { failureRedirect: '/login' }).call(this, arguments[0], arguments[1], console.log)
  },
  function(req, res, next) {
    // Successful authentication, redirect home.
    res.redirect('/');
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
