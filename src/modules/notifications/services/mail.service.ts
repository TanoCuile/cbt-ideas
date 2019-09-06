import { Injectable } from "@nestjs/common";
import { createTransport, Transporter } from "nodemailer";

@Injectable()
export class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: 'smtp',
      port: 25
    });
  }

  /** @todo use passed email */
  async send(to: string, subject: string, text: string) {
    return this.transporter.sendMail({
      from: 'ideas@cbt.com',
      to: 'pixog@be-breathtaking.net',
      subject,
      text,
    });
  }
}