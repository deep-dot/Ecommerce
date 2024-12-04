

console.log('in config js', process.env.NODE_ENV );

module.exports = {
  urls: {
    development: [
      process.env.DEV_HOST1,
      process.env.DEV_HOST2,
    ],
    production: [
      process.env.PROD_HOST,
    ]
    // development: process.env.DEV_HOST1,
    // production: process.env.PROD_HOST,
  },
  db_url: {
    development: process.env.DB_URI_DEV,
    production: process.env.DB_URI_PROD,
  },
  // google_url: {
  //   development: process.env.GOOGLE_CALLBACK_URL_DEV,
  //   production: process.env.GOOGLE_CALLBACK_URL_PROD
  // },
  // fb_url: {
  //   development: process.env.FB_CALLBACK_URL_DEV,
  //   production: process.env.FB_CALLBACK_URL_PROD
  // },
  // smtpEmail: {
  //   development: process.env.SMTP_MAIL,
  //   production:  process.env.SMTP_MAIL_PROD,
  // },
  // smtpPort: {
  //   development: process.env.SMTP_PORT,
  //   production: process.env.SMTP_PORT_PROD,
  // },
  // emailPass: {
  //   development: process.env.GOOGLE_PASS,
  //   production: process.env.GOOGLE_PASS_PROD,
  // },
  // smtpHost: {
  //   development: process.env.SMTP_HOST,
  //   production: process.env.SMTP_HOST_PROD,
  // }
};
