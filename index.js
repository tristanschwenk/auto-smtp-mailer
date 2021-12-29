import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config()
import fs from 'fs';

const template = fs.readFileSync("./template.html", {encoding: 'utf-8'})

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "mail.gandi.net",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER, // generated ethereal user
      pass: process.env.MAIL_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"NAS-SERVER🖥" <tristan.schwenk@ezyostudio.com>', // sender address
    to: "bonox.schwenk@gmail.com", // list of receivers
    subject: "Start Up!", // Subject line
    text: "Hello world?", // plain text body
    html: template, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);