import { Request } from 'express';
import passport = require('passport');

export class CookieTokenStategy extends passport.Strategy {
  name: string = 'token';
  protected validate?: (token: string) => Promise<any>;

  async authenticate(req: Request, options?: any) {
    try {
      if (req.cookies.ct_tok) {
        if (this.validate) {
          const validResult = await this.validate(req.cookies.ct_tok);
          if (!validResult) {
            return this.fail();
          }
          return this.success(validResult);
        }
        return this.success(req.cookies.ct_tok);
      }
      return this.fail();
    } catch (e) {
      return this.error(e);
    }
  }
}
