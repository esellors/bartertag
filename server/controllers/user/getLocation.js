const getLocation = async function(req, res) {
   const {locationId} = req.params;

   const db = req.app.get('db');
   const cityState = await db.get_location(locationId);

   res.status(200).json(cityState[0]);

};

module.exports = getLocation;