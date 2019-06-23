INSERT INTO user_item (user_id, item_category, item_condition, item_name, item_desc, img_aws_key, img_aws_url)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;