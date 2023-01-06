const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    //GMAIL: Activated 'less secure app' in gmail
    // service: 'Gmail',
    // auth:{
    //   user: process.env.GMAIL_USERNAME,
    //   pass: process.env.GMAIL_PASSWORD
    // }
    service: "SendGrid",
    // secure: false,
    // ignoreTLS: true,
    // logger: true,
    // debug: true,
    // host: process.env.GRID_HOST,
    // port: process.env.GRID_PORT,
    auth: {
      user: process.env.GRID_USERNAME,
      pass: process.env.GRID_PASSWORD,
    },
  });

  const mailOptions = {
    from: "paganowebdev@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
