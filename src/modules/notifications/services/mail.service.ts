import { Injectable } from "@nestjs/common";
import { createTransport, Transporter } from "nodemailer";

@Injectable()
export class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: 'smtp.gmail.com',
      auth: {
        user: 'bohdan.lubenets',
        pass: 'eozlpqbhfyejfvco'
      }
    });
  }

  send() {
    this.transporter.sendMail({
      from: 'bohdan.lubenets@gmail.com',
      to: 'bohdan.lubenets@gmail.com',
      subject: 'Test',
      text: 'Test text.',
    });
  }
}