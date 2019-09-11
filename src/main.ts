import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { resolve } from 'path';
import { FixturesProvider } from './modules/fixtures/providers/fixtures.provider';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import * as OAuth2Strategy from 'passport-oauth2';
import { API_TITLE, API_DESCRIPTION } from './constants';
import { Next } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.useStaticAssets(resolve(process.cwd(), 'static'), {
    extensions: ['js', 'css'],
    prefix: '/static',
  });
  app.enableCors({ credentials: true, origin: true });

  passport.use(
    'oauth2',
    new OAuth2Strategy(
      {
        authorizationURL: 'http://0.0.0.0:3100/dialog/authorize',
        tokenURL: 'http://0.0.0.0:3100/oauth/token',
        clientID: 'abc123',
        clientSecret: 'ssh-secret',
        callbackURL: 'http://0.0.0.0:3006/auth/ideas_forum/callback',
      },
      function(accessToken, refreshToken, profile, cb) {
        console.log('---------', arguments);
        return cb(null, {
          id: '1',
        });
      },
    ),
  );
  app.use(passport.initialize());
  // app.use(passport.session());
  app.getHttpAdapter().get('/auth', passport.authenticate('oauth2'));

  (app.getHttpAdapter() as any).get(
    '/auth/ideas_forum/callback',
    passport.authenticate('oauth2', {
      successRedirect: '/',
      failureRedirect: '/login',
    }),
  );
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
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

  await app.listen(3006);
}
bootstrap();
