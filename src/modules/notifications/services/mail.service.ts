import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { DEFAULT_IDEAS_EMAIL } from '../../../constants';

@Injectable()
export class MailService {
  private transport: Transporter;

  constructor() {
    this.transport = createTransport({
      host: '0.0.0.0',
      port: 465,
      secure: false,
      auth: {
        user: 'admin@cbtmp.id',
        pass: '123',
      },
      tls: { rejectUnauthorized: false },
      debug: true,
    });
  }

  async send(to: string, subject: string, html: string) {
    try {
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
    } catch (error) {
      throw new Error(
        JSON.stringify({ message: 'transport_not_verified', data: error }),
      );
    }
  }
}
