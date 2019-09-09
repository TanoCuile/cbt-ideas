import { Injectable } from '@nestjs/common';
import * as ejs from 'ejs';
import { resolve } from 'path';

@Injectable()
export class MailTemplateService {
  async getMailBody(templateName: string, options: object): Promise<string> {
    return ejs.renderFile(
      resolve(
        process.cwd(),
        'resources',
        'templates',
        'mail',
        `${templateName}.mail.html.ejs`,
      ),
      options,
    );
  }
}
