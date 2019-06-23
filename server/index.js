require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const inventoryRoutes = require('./routes/inventory');
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
app.use('/api/inventory', inventoryRoutes);

app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`));