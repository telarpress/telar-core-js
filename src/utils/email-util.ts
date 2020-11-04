// Copyright (c) 2020 Amirhossein Movahedi (@qolzam)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import htmlUtil from './html-util';

import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export class Email {
    private mailTransport?: Mail;
    private refEmail: string;
    private password: string;
    private emailService: string;
    private constructor(_refEmail: string, _password: string, _emailService: string) {
        this.refEmail = _refEmail;
        this.password = _password;
        this.emailService = _emailService;
    }

    /**
     * Create a new email
     * @param refEmail Source email address
     * @param password Source email password
     * @param emailService Email service type
     */
    static NewEmail(refEmail: string, password: string, emailService: string): Email {
        return new Email(refEmail, password, emailService);
    }

    /**
     * Initialize email
     */
    initEmail(): void {
        this.mailTransport = nodemailer.createTransport({
            service: this.emailService,
            auth: {
                user: this.refEmail,
                pass: this.password,
            },
        });
    }
    /**
     * Send an email
     * @param req Email request object
     * @param tmplPath HTML template path
     * @param data Parameter for HTML template
     */
    async sendEmail(req: EmailRequest, tmplPath: string, data: Record<string, unknown>): Promise<unknown> {
        try {
            const htmlToSend = await htmlUtil.getParsedHtml(tmplPath, data);
            const mailOptions = {
                from: this.refEmail,
                to: req.to,
                subject: req.subject,
                html: htmlToSend,
            };
            if (!this.mailTransport) {
                // eslint-disable-next-line no-console
                console.error('The email is nit initialize. Call initEmail() before send!');
                throw new Error(`The email is nit initialize. Call initEmail() before send!`);
            }
            const result = await this.mailTransport.sendMail(mailOptions);
            return result;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('There was an error while sending the email:', error);
            throw new Error(`There was an error while sending the email: ${error}`);
        }
    }
}

export class EmailRequest {
    to: string;
    subject: string;
    private constructor(_to: string, _subject: string) {
        this.to = _to;
        this.subject = _subject;
    }
    /**
     * Create an email request
     * @param to Destination email address
     * @param subject Email subject
     */
    static NewEmailRequest(to: string, subject: string): EmailRequest {
        return new EmailRequest(to, subject);
    }
}
