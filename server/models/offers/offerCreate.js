const offerCreate = async function(req, res) {
   const {offerStatus, primaryUserId, secondaryUserIdNew, taggedUserId, primaryItem1Id, primaryItem2Id, primaryItem3Id, secondaryItemId, senderUserId, messageStatus, userMessage, userMessageRemark, notificationStatus} = req.body

   const db = req.app.get('db');

   // create new offer
   let createOfferRes;

   try {
      createOfferRes = await db.create_offer(offerStatus, primaryUserId, secondaryUserIdNew, taggedUserId, primaryItem1Id, primaryItem2Id, primaryItem3Id, secondaryItemId);
   } catch(err) {
      console.log(err);
      return res.status(500).send('Error creating new offer');
   }

   const offerId = createOfferRes[0].offer_id;

   // create new offer message
   try {
      await db.offer_message_add(offerId, messageStatus, senderUserId, userMessage, userMessageRemark);
   } catch(err) {
      console.log(err);
      return res.status(500).send('Error creating new offer message');
   }
   
   // send notification to item owner
   try {
      await db.user_notification_add(taggedUserId, offerId, notificationStatus);
   } catch(err) {
      console.log(err);
      return res.status(500).send('Error creating new user notification');
   }

   res.status(200).send('Offer created and owner notified!');
}

module.exports = offerCreate;

