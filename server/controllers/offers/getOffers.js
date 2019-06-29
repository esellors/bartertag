const getOffers = async function(req, res) {
   const {userId} = req.params;
   const db = req.app.get('db');

   let newOffers, pendingOffersAsPrimary, pendingOffersAsSecondary, closedOffersAsPrimary, closedOffersAsSecondary;

   try {
      newOffers = await db.get_offers_as_secondary(userId, 'new');
   
      pendingOffersAsPrimary = await db.get_offers_as_primary(userId, 'pending');
   
      pendingOffersAsSecondary = await db.get_offers_as_secondary(userId, 'pending');
   
      closedOffersAsPrimary = await db.get_offers_as_primary(userId, 'closed');
   
      closedOffersAsSecondary = await db.get_offers_as_secondary(userId, 'closed');
   } catch(err) {
      console.log(err)
      return res.status(500).send('Error fetching offers.')
   }

   res.status(200).json({newOffers, pendingOffersAsPrimary, pendingOffersAsSecondary, closedOffersAsPrimary, closedOffersAsSecondary});
}
   
module.exports = getOffers;