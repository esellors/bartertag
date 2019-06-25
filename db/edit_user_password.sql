UPDATE users
SET hash = $2
WHERE user_id = $1;