UPDATE user_item
SET item_category = $2, 
   item_condition = $3, 
   item_name = $4, 
   item_desc = $5
WHERE
    user_item_id = $1
RETURNING *;