INSERT INTO offer_message (offer_id, message_status, sender_user_id, message_text, message_remark)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;