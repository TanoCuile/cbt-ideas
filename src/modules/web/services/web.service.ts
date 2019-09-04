import { Injectable } from '@nestjs/common';
import { readdirSync } from 'fs';
import { resolve, join, sep } from 'path';

@Injectable()
export class WebService {
  private readonly appScriptRegex = new RegExp('app.(.*).js');

  getAbsoluteStaticPath(): string {
    return resolve(process.cwd(), 'static');
  }

  getWebStaticPath(): string {
    return join(sep, 'static');
  }

  getAppScript(): any {
    return readdirSync(join(this.getAbsoluteStaticPath(), 'js'))
      .filter(file => file.match(this.appScriptRegex))
      .reduce(
        (last, current) => {
          const [, version] = (this.appScriptRegex.exec(
            current,
          ) as unknown) as [string, string];

          if (Number(version) > last.version) {
            return {
              version: Number(version),
              path: join(this.getWebStaticPath(), 'js', current),
            };
          }

          return last;
        },
        { version: 0, path: '' } as {
          version: number;
          path: string;
        },
      ).path;
  }
}
