require('dotenv').config();
const nodemailer = require('nodemailer');

const contact = function(req, res) {
   const {firstName, lastName, userEmailAddress, userEmailBody} = req.body;
   const {EMAIL_HOST, EMAIL_NAME, EMAIL_PW} = process.env;

   const transport = {
      host: EMAIL_HOST,
      auth: {
         user: EMAIL_NAME,
         pass: EMAIL_PW
      }
   };

   const transporter = nodemailer.createTransport(transport);

   const helperOptions = {
      from: process.env.EMAIL_NAME,
      to: process.env.EMAIL_NAME,
      subject: `BarterTag Support Message from ${firstName} ${lastName}, ${userEmailAddress}`,
      text: userEmailBody,
      replyTo: userEmailAddress
   };
   
   transporter.sendMail(helperOptions, (err, success) => {
      if (err) {
         console.log(err);
         res.send( 'Failed to send message.' );
      } else {
         console.log(success);
         res.send( 'Message sent successfully!' );
      };
   })
}

module.exports = contact;