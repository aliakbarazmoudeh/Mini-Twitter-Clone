const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'aliakbarazmoudeh2004@gmail.com',
    pass: 'gfzamwarfxizsnbw',
  },
});

const sendVerificationLink = (email) => {
  console.log(email);
  const mailOptions = {
    from: 'Mini Twitter <aliakbarazmoudeh2004@gmail.com>',
    to: email,
    subject: 'test Mini Twitter',
    text: 'finaly',
    html: `<h1>Verification for your account</h1><br><h3>to verify your email pleas click on the button</h3><br><a href="http://localhost:5000/api/v1/users/verify" style="background:blue;
    color:white;
    border:none;
    padding:0.5rem 2rem;
    font-size:18px;
    border-radius:5px;
    text-decoration:none;">Verfiy</a>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });
};

module.exports = sendVerificationLink;
