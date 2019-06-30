const updateMessageToSeen = async function(req, res) {
   const offerMessageId = parseInt(req.params.offerMessageId)
   const db = req.app.get('db');

   //
   try {
      await db.update_message_to_seen(offerMessageId);
   } catch(err) {
      return res.status(500).send('Error updating offer message status');
   }

   res.sendStatus(200);
};

module.exports = updateMessageToSeen;