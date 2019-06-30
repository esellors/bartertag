const clearAll = async function(req, res) {
   const userId = parseInt(req.params.userId);
   const db = req.app.get('db');

   try {
      db.clear_user_notifications(userId);
   } catch(err) {
      console.log(err);
      return res.status(500).send('There was an error clearing notifications');
   }
   res.sendStatus(200);
};

module.exports = clearAll;