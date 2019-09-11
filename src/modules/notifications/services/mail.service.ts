import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import {
  DEFAULT_IDEAS_EMAIL,
  EMAIL_SERVICE,
  EMAIL_ACCOUNT,
  EMAIL_PASS,
} from '../../../constants';

@Injectable()
export class MailService {
  private transport?: Transporter;

  constructor() {
    if (process.env.EMAIL_SERVICE) {
      this.transport = createTransport({
        service: EMAIL_SERVICE,
        auth: {
          user: EMAIL_ACCOUNT,
          pass: EMAIL_PASS,
        },
        debug: true,
      });
    }
  }

  async send(to: string, subject: string, html: string) {
    try {
      if (this.transport) {
        await this.transport.verify();

        try {
          const info = await this.transport.sendMail({
            from: DEFAULT_IDEAS_EMAIL,
            to,
            subject,
            html,
          });

          return info;
        } catch (error) {
          throw new Error(
            JSON.stringify({ message: 'send_mail_error', data: error }),
          );
        }
      }
    } catch (error) {
      throw new Error(
        JSON.stringify({ message: 'transport_not_verified', data: error }),
      );
    }
  }
}
