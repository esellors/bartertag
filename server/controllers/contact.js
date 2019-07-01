require('dotenv').config();
const nodemailer = require('nodemailer');

const contact = function(req, res) {
   console.log(req.body)

   const transport = {
       host: 'mail.privateemail.com',
       auth: {
           user: process.env.EMAIL_NAME,
           pass: process.env.EMAIL_PW
       }
     }
   const transporter = nodemailer.createTransport(transport);

   const {firstName, lastName, userEmailAddress, userEmailBody} = req.body;
   
   const mail = {
       from: process.env.EMAIL_NAME,
       to: process.env.EMAIL_NAME,
       subject: `BarterTag Support Message from ${firstName} ${lastName}, ${userEmailAddress}`,
       text: userEmailBody,
       replyTo: userEmailAddress
   }
   
   transporter.sendMail(mail, (err, data) => {
      if (err) {
         console.log(err);
         res.send( 'Failed to send message.' );
       } else {
         res.send( 'Message sent successfully!' );
       };
   })
}

module.exports = contact;