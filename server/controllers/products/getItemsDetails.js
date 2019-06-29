const getItemsDetails = async function(req, res) {
   const {secondaryItemId, primaryItem1Id, primaryItem2Id, primaryItem3Id} = req.params;
   const db = req.app.get('db');

   // get item details if item id is number
   
   let secondaryItemIdRes, primaryItem1IdRes, primaryItem2IdRes, primaryItem3IdRes;

   if (!isNaN(secondaryItemId)) {
      secondaryItemIdRes = await db.get_item_details(parseInt(secondaryItemId));
   }

   if (!isNaN(primaryItem1Id)) {
      primaryItem1IdRes = await db.get_item_details(parseInt(primaryItem1Id));
   }

   if (!isNaN(primaryItem2Id)) {
      primaryItem2IdRes = await db.get_item_details(parseInt(primaryItem2Id));
   }

   if (!isNaN(primaryItem3Id)) {
      primaryItem3IdRes = await db.get_item_details(parseInt(primaryItem3Id));
   }

   let dbRes = [secondaryItemIdRes, primaryItem1IdRes, primaryItem2IdRes, primaryItem3IdRes];

   // Filter out undefined

   let itemsDetails = [];

   for (let i = 0; i < dbRes.length; i++) {
      if (dbRes[i] !== undefined) itemsDetails.push(dbRes[i][0]);
   }
   
   res.status(200).json(itemsDetails);
}

module.exports = getItemsDetails;