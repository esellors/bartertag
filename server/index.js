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
const app = express();

const {SERVER_PORT, SESSION_SECRET, DATABASE_STRING} = process.env;

app.use((req, res, next) => {
   console.log('================ server hit ================');
   next();
});

app.use(express.json());

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

app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`));