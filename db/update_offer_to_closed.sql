UPDATE offer
SET offer_status = $2,
   finalizing_user_id = $3,
   finalizing_remark = $4,
   time_finalized = current_timestamp
WHERE offer_id = $1;