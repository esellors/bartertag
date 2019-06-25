const getAllInventory = async function(req, res) {
   const {userId} = req.params;
   const db = req.app.get('db');

   const userInventory = await db.get_all_user_inventory(userId)

   res.status(200).json(userInventory)

};

module.exports = getAllInventory;