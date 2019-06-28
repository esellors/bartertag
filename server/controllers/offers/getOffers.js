const getOffers = async function(req, res) {
   const {userId} = req.params;
   const db = req.app.get('db');

   const newOffers = await db.get_offers_as_secondary(userId, 'new');
   const pendingOffersAsPrimary = await db.get_offers_as_primary(userId, 'pending');
   const pendingOffersAsSecondary = await db.get_offers_as_secondary(userId, 'pending');
   const closedOffersAsPrimary = await db.get_offers_as_primary(userId, 'closed');
   const closedOffersAsSecondary = await db.get_offers_as_secondary(userId, 'closed');

   res.status(200).json({newOffers, pendingOffersAsPrimary, pendingOffersAsSecondary, closedOffersAsPrimary, closedOffersAsSecondary});
}

module.exports = getOffers;