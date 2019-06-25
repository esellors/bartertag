UPDATE user_item
SET img_aws_key = $2, 
   img_aws_url = $3
WHERE
    user_item_id = $1
RETURNING *;