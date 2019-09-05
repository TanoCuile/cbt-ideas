import { Module } from '@nestjs/common';
import { FixturesProvider } from '../fixtures/providers/fixtures.provider';
import { ClassProvider } from '@nestjs/common/interfaces';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [],
  providers: [
    {
      provide: 'FIXTURES_PROVIDER',
      useClass: FixturesProvider,
    } as ClassProvider<FixturesProvider>,
  ],
  exports: ['FIXTURES_PROVIDER'],
})
export class FixturesModule {}
