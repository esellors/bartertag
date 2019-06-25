UPDATE users
SET first_name = $2,
    last_name = $3,
    username = $4,
    email = $5,
    location_id = $6
WHERE user_id = $1;
