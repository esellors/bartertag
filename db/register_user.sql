INSERT INTO users (first_name, last_name, username, email, location_id, hash)
VALUES ($1, $2, $3, $4, $5, $6);

SELECT * FROM users
WHERE username = $3;