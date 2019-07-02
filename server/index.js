require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const inventoryRoutes = require('./routes/inventory');
const productsRoutes = require('./routes/products');
const offersRoutes = require('./routes/offers');
const notificationsRoutes = require('./routes/notifications');
const nodemailer = require('nodemailer');
const contact = require('./controllers/contact');
const app = express();

const {SERVER_PORT, SESSION_SECRET, DATABASE_STRING, EMAIL_HOST, EMAIL_NAME, EMAIL_PW} = process.env;

app.use((req, res, next) => {
   console.log('================ server hit ================');
   next();
});

app.use(express.json());

app.use( express.static( `${__dirname}/../build` ) );

const transporter = nodemailer.createTransport(
   {
      host: EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
         user: EMAIL_NAME,
         pass: EMAIL_PW
      }
   }
);

transporter.verify((error, success) => {
   if (error) {
      console.log(error);
   } else {
      console.log('Server listening for messages');
   };
 })
 

app.use(session({
   secret: SESSION_SECRET,
   resave: false,
   saveUninitialized: true,
   cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
   }
}));

massive(DATABASE_STRING).then(db => {
   app.set('db', db);
   console.log('Database linked');
});

app.use('/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/offers', offersRoutes);
app.use('/api/notifications', notificationsRoutes);

app.post('/api/contact', contact);

app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`));