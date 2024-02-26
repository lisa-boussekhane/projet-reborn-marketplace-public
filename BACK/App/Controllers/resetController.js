const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'adoptareborn.contactus@gmail.com',
    pass: 'dxkv dkwr ykda olax',
  },
});

const sendEmail = async (to, subject, htmlContent) => {
  try {
    // Send mail with defined transport object
    const mailOptions = await transporter.sendMail({
      from: 'adoptareborn.contactus@gmail.com',
      to,
      subject,
      html: htmlContent,
    });

    console.log('Email sent successfully:', mailOptions.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
