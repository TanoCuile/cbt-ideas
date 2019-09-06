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

  send() {
    this.transporter.sendMail({
      from: 'ideas@cbt.com',
      to: 'bohdan.lubenets@gmail.com',
      subject: 'Test',
      text: 'Test text.',
    });
  }
}