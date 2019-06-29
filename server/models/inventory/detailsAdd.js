const detailsAdd = async function(req, res) {
   const {user_id, item_category, item_condition, item_name, item_desc, img_aws_key, img_aws_url} = req.body;

   console.log(req.body)

   const db = req.app.get('db');
   const newItem = await db.add_item(user_id, item_category, item_condition, item_name, item_desc, img_aws_key, img_aws_url);

   res.status(201).json(newItem[0]);
};

module.exports = detailsAdd;