UPDATE offer_message
SET message_status = 'seen'
WHERE offer_message_id = $1;