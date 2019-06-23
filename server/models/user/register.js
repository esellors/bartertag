const bcrypt = require('bcryptjs');

const register = async function (req, res) {
   const {firstName, lastName, username, email, city, state, password} = req.body;
   const db = req.app.get('db');

   // check for existing username
   const existingUsername = await db.check_username(username);

   if (existingUsername[0]) {
      return res.status(409).send('Username already taken');
   };

   // check for existing email
   const existingEmail = await db.check_email(email);

   if (existingEmail[0]) {
      return res.status(409).send('Email is associated with another account')
   };

   // return existing location or create location
   let locationId = -1;

   const existingLocation = await db.check_location(city, state);

   if (existingLocation[0]) {
      locationId = existingLocation[0].location_id;
   } else {
      const location = await db.create_location(city, state);
      locationId = location[0].location_id;
   };

   // generate password hash
   const salt = bcrypt.genSaltSync(10);
   const hash = bcrypt.hashSync(password, salt);

   // add as new user, add to db login log, add to session, and return
   const newUser = await db.register_user(firstName, lastName, username, email, locationId, hash);

   await db.log_user_login(newUser[0].user_id);

   req.session.user = {
      userId: newUser[0].user_id,
      locationId: newUser[0].location_id,
      firstName: newUser[0].first_name,
      lastName: newUser[0].last_name,
      username: newUser[0].username,
      email: newUser[0].email,
      joinDate: newUser[0].time_joined
   };

   res.status(200).json(req.session.user);
};

module.exports = register;