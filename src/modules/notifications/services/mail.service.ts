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

  async send(to: string, subject: string, text: string) {
    return this.transporter.sendMail({
      from: 'ideas@cbt.com',
      to,
      subject,
      text,
    });
  }
}