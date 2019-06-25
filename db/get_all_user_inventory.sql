SELECT * FROM user_item
WHERE user_id = $1
ORDER BY user_item_id DESC;