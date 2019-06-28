INSERT INTO offer (offer_status, primary_user_id, secondary_user_id, tagged_user_id, primary_item1_id, primary_item2_id, primary_item3_id, secondary_item_id)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING offer_id;