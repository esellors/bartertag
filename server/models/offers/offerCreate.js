const offerCreate = async function(req, res) {
   const {offerStatus, primaryUserId, secondaryUserId, taggedUserId, primaryItem1Id, primaryItem2Id, primaryItem3Id, secondaryItemId, senderUserId, messageStatus, userMessage, userMessageRemark, notificationStatus} = req.body

   const db = req.app.get('db');

   // create new offer
   const createOfferRes = await db.create_offer(offerStatus, primaryUserId, secondaryUserId, taggedUserId, primaryItem1Id, primaryItem2Id, primaryItem3Id, secondaryItemId);

   const offerId = createOfferRes[0].offer_id;

   // create new offer message
   await db.offer_message_add(offerId, messageStatus, senderUserId, userMessage, userMessageRemark);

   // send notification to responding user
   await db.user_notification_add(taggedUserId, offerId, notificationStatus);

   res.status(200).send('Offer created and owner notified!');
}

module.exports = offerCreate;

