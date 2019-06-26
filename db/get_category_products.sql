SELECT * from user_item
WHERE item_category = $1 
ORDER BY user_item_id DESC;