const bcrypt = require('bcryptjs');

const login = async function (req, res) {
   const {username, password} = req.body;
   const db = req.app.get('db');

   // check for existing username
   const foundUser = await db.check_username(username);

   // authenticate user
   if (!foundUser[0]) {
      return res.status(401).send('Username incorrect');
   };

   const isAuthenticated = bcrypt.compareSync(password, foundUser[0].hash);

   if (!isAuthenticated) {
      return res.status(403).send('Password incorrect');
   };

   // add authenticated user to db login log, add to session, and return
   await db.log_user_login(foundUser[0].user_id);
   
   req.session.user = {
      userId: foundUser[0].user_id,
      locationId: foundUser[0].location_id,
      firstName: foundUser[0].first_name,
      lastName: foundUser[0].last_name,
      username: foundUser[0].username,
      email: foundUser[0].email,
      joinDate: foundUser[0].time_joined
   };

   res.status(200).json(req.session.user);
};

module.exports = login;