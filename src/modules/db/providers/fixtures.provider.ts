import { ClassProvider } from '@nestjs/common/interfaces';
import { Repository } from 'typeorm';
import { Idea } from '../models/idea.model';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { User } from '../models/user.model';

export class FixturesProvider {
  constructor(
    protected ideasRepo: Repository<Idea>,
    protected commentsRepo: Repository<Comment>,
    protected userRepo: Repository<User>,
  ) {}

  async shouldImportFixtures(): Promise<boolean> {
    return true;
  }

  async import(): Promise<boolean> {
    const ideasFixtures = JSON.parse(
      readFileSync(
        resolve(process.cwd(), 'resources', 'fixtures', 'ideas.fixture.json'),
      ).toString(),
    );

    console.log('>>>', ideasFixtures);
    return true;
  }
}
