import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { DEFAULT_IDEAS_EMAIL } from 'src/constants';

@Injectable()
export class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: 'smtp',
      port: 25,
    });
  }

  /** @todo use passed email */
  async send(to: string, subject: string, text: string) {
    console.log('>>>>>>', {
      from: DEFAULT_IDEAS_EMAIL,
      to,
      subject,
      text,
    });
    return this.transporter.sendMail({
      from: DEFAULT_IDEAS_EMAIL,
      to,
      subject,
      text,
    });
  }
}
