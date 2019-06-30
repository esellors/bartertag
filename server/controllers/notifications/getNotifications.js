const getNotifications = async function (req, res) {
   const userId = parseInt(req.params.userId);

   let userNotificationStatus = false;
   const db = req.app.get('db');

   try {
      const notifications = await db.get_user_notifications_status(userId)
      if (notifications[0]) userNotificationStatus = true;
   } catch(err) {
      console.log(err);
      return res.status(500).send('There was an error retrieving notifications.');
   }

   res.status(200).send(userNotificationStatus);
};

module.exports = getNotifications;