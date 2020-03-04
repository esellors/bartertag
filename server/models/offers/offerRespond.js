const offerRespond = async function (req, res) {
   const {offerId, offerStatus, closeRemark, finalizingUserId, taggedUserId, senderUserId, messageStatus, userMessage, userMessageRemark, notificationStatus} = req.body;

   const db = req.app.get('db');

   if (offerStatus === 'closed') {

      try {
         await db.update_offer_to_closed(offerId, offerStatus, finalizingUserId, closeRemark);
      } catch(err) {
         console.log(err);
         return res.status(400).send('There was an error updating the offers db');
      };
      try {
         await db.offer_message_add(offerId, messageStatus, senderUserId, userMessage, userMessageRemark);
      } catch(err) {
         console.log(err);
         return res.status(400).send('There was an error updating the offer message db');
      };
      try {
         await db.user_notification_add(taggedUserId, offerId, notificationStatus);
      } catch(err) {
         console.log(err);
         return res.status(400).send('There was an error updating the user notification db');
      };
      res.status(200).send('Offer closed! You must create a new offer if you want to try this offer again.');

   } else {
      try {
         await db.update_offer_pending(offerId, offerStatus, taggedUserId);
      } catch(err) {
         console.log(err);
         res.status(400).send('There was an error updating the offer db');
      };
      try {
         await db.offer_message_add(offerId, messageStatus, senderUserId, userMessage, userMessageRemark);
      } catch(err) {
         console.log(err);
         return res.status(400).send('There was an error updating the offer message db');
      };
      try {
         await db.user_notification_add(taggedUserId, offerId, notificationStatus);
      } catch(err) {
         console.log(err);
         return res.status(400).send('There was an error updating the user notification db');
      };

      res.status(200).send('Offer updated and owner notified!');
   };
};

module.exports = offerRespond;