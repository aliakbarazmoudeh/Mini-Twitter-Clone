// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'aliakbarazmoudeh@gmail.com',
//     pass: '0926979493',
//   },
// });

// var mailOptions = {
//   from: 'aliakbarazmoudeh@gmail.com',
//   to: 'aliakbarazmoudeh2004@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!',
// };

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

const nodemailer = require('nodemailer');

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'aliakbarazmoudeh2004@gmail.com',
    pass: 'gfzamwarfxizsnbw',
  },
});

// Define the email options
const mailOptions = {
  from: 'Mini Twitter <aliakbarazmoudeh2004@gmail.com>',
  to: 'aliakbarazmoudeh@gmail.com',
  subject: 'test Mini Twitter',
  text: 'finaly',
  html: `<h1>Verification for your account</h1><br><h3>to verify your email pleas click on the button</h3><br><a href="http://localhost:5000/users/verify" style="background:blue;
 color:white;
 border:none;
 padding:0.5rem 2rem;
 font-size:18px;
 border-radius:5px;
  text-decoration:none;">Verfiy</a>`,
};

// Send the email
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent');
  }
});
