const getOffers = async function (req, res) {
   const {userId} = req.session.user;
   const db = req.app.get('db');

   let newOffers, pendingOffersAsPrimary, pendingOffersAsSecondary, closedOffersAsPrimary, closedOffersAsSecondary;

   let allOffers, offersIdArr, allMessages, latestMsgs = [];

   // get offers user is/has been a part of
   try {
      allOffers = await db.get_all_user_offers(userId);
   } catch (err) {
      console.log(err);
      return res.status(500).send('Error fetching offers');
   }

   // sift out the offer IDs for use in getting offer messages
   offersIdArr = allOffers.map(offer => offer.offer_id);

   // retrieve said messages
   try {
      allMessages = await db.get_all_user_offers_messages([[offersIdArr]]);
   } catch (err) {
      console.log(err);
      return res.status(500).send('Error fetching offer messages');
   }

   // keep latest message only
   allMessages.forEach(allMsg => {
      if (!latestMsgs.some(latestMsg => allMsg.offer_id === latestMsg.offer_id)) {
         latestMsgs.push(allMsg);
      }
   });

   // attach message to correct offer
   allOffers.forEach(offer => {
      const tgtMsg = latestMsgs.find(msg => msg.offer_id === offer.offer_id)
      Object.assign(offer, tgtMsg);
   });

   // separate offers by type

   newOffers = allOffers.filter(offer => offer.offer_status === 'new' && offer.secondary_user_id === userId);

   pendingOffersAsPrimary = allOffers.filter(offer => (offer.offer_status === 'pending' || offer.offer_status === 'new') && offer.primary_user_id === userId);

   pendingOffersAsSecondary = allOffers.filter(offer => offer.offer_status === 'pending' && offer.secondary_user_id === userId);

   closedOffersAsPrimary = allOffers.filter(offer => offer.offer_status === 'closed' && offer.primary_user_id === userId);

   closedOffersAsSecondary = allOffers.filter(offer => offer.offer_status === 'closed' && offer.secondary_user_id === userId);

   console.log({ newOffers, pendingOffersAsPrimary, pendingOffersAsSecondary, closedOffersAsPrimary, closedOffersAsSecondary })

   res.status(200).json({newOffers, pendingOffersAsPrimary, pendingOffersAsSecondary, closedOffersAsPrimary, closedOffersAsSecondary});
}

module.exports = getOffers;

// const getOffers = async function(req, res) {
//    const userId = parseInt(req.params.userId);
//    const db = req.app.get('db');

//    let newOffers, pendingOffersAsPrimary, pendingOffersAsSecondary, closedOffersAsPrimary, closedOffersAsSecondary;

//    try {
//       newOffers = await db.get_offers_as_secondary(userId, 'new');

//       pendingOffersAsPrimary = await db.get_offers_as_primary(userId, 'pending');

//       pendingOffersAsSecondary = await db.get_offers_as_secondary(userId, 'pending');

//       closedOffersAsPrimary = await db.get_offers_as_primary(userId, 'closed');

//       closedOffersAsSecondary = await db.get_offers_as_secondary(userId, 'closed');
//    } catch(err) {
//       console.log(err)
//       return res.status(500).send('Error fetching offers.')
//    }

//    res.status(200).json({newOffers, pendingOffersAsPrimary, pendingOffersAsSecondary, closedOffersAsPrimary, closedOffersAsSecondary});
// }

// module.exports = getOffers;