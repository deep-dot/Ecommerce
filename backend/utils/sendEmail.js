const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../config.env') });
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host:process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT == 465,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.GOOGLE_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to the email server:', error.message);
  } else {
    console.log('Server is ready to take messages:', success);
  }
});

const sendEmail = async (options) => {
  console.log('sendEmail.js utils', options)

  const mailOptions = {
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent successfully:', info.response);
    }
  });

};

module.exports = sendEmail;
