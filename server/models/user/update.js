const bcrypt = require('bcryptjs');

const update = async function (req, res) {
   const {userId, firstName, lastName, username, email, city, state, password} = req.body;
   const db = req.app.get('db');

   // return existing location or create location
   let locationId = -1;

   const existingLocation = await db.check_location(city, state);

   if (existingLocation[0]) {
      locationId = existingLocation[0].location_id;
   } else {
      const location = await db.create_location(city, state);
      locationId = location[0].location_id;
   };

   // update existing users info
   await db.edit_user_details(userId, firstName, lastName, username, email, locationId);

   
   // if password provided, generate password hash
   if (password.length > 0) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      await db.edit_user_password(userId, hash);
   }

   res.sendStatus(200);
};

module.exports = update;