const detailsUpdate = async function(req, res) {
   const {user_item_id, item_category, item_condition, item_name, item_desc, img_aws_key, img_aws_url} = req.body;

   const db = req.app.get('db');

   let updatedItem = await db.edit_item_details(user_item_id, item_category, item_condition, item_name, item_desc);

   if (img_aws_key && img_aws_url) {
      updatedItem = await db.edit_item_img(user_item_id, img_aws_key, img_aws_url);
   }
   
   res.status(201).json(updatedItem[0]);

}

module.exports = detailsUpdate;