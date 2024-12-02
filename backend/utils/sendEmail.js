const path = require('path');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.resolve(__dirname, '../config.env') });
}
const nodemailer = require('nodemailer');
const config = require('../config/config.js');
const env = process.env.NODE_ENV || 'development';

console.log('smtp port==-=', config.smtpPort[env])
const transporter = nodemailer.createTransport({
  // host: process.env.SMTP_HOST || 'smtp.gmail.com',
  // port: process.env.SMTP_PORT || 587,
  // secure: false, // Use STARTTLS for port 587
  // auth: {
  //   user: process.env.SMTP_MAIL,
  //   // user: config.smtpEmail[env],
  //   pass: process.env.GOOGLE_PASS,
  // },
  host: config.smtpHost[env],
  port: config.smtpPort[env],
  secure: false, // Use STARTTLS for port 587
  auth: {
    user: config.smtpEmail[env],
    // user: config.smtpEmail[env],
    pass: config.emailPass[env],
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
