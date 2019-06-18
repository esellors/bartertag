INSERT INTO location (city, state)
VALUES ($1, $2)
RETURNING *;