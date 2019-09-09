import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { DEFAULT_IDEAS_EMAIL } from 'src/constants';

@Injectable()
export class MailService {
  private transport: Transporter;

  constructor() {
    this.transport = createTransport({
      host: 'smtp',
      port: 25,
    });
  }

  /** @todo use passed email */
  async send(to: string, subject: string, text: string) {
    try {
      await this.transport.verify();
      try {
        const info = await this.transport.sendMail({
          from: DEFAULT_IDEAS_EMAIL,
          to,
          subject,
          text,
        });

        console.log('>>>', info);

        return info;
      } catch (error) {
        throw new Error(
          JSON.stringify({ message: 'send_mail_error', data: error }),
        );
      }
    } catch (error) {
      throw new Error(
        JSON.stringify({ message: 'transport_not_verified', data: error }),
      );
    }
  }
}
