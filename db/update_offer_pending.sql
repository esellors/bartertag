UPDATE offer
SET offer_status = $2,
   tagged_user_id = $3
WHERE offer_id = $1;