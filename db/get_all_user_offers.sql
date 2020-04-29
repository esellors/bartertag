SELECT o.offer_id, o.offer_status, o.time_initiated, o.time_finalized, o.primary_user_id, o.secondary_user_id, o.tagged_user_id, o.finalizing_user_id, o.finalizing_remark, o.primary_item1_id, o.primary_item2_id, o.primary_item3_id, o.secondary_item_id, u.username, l.city, l.state
FROM offer o
INNER JOIN users u ON o.primary_user_id = u.user_id
INNER JOIN location l ON u.location_id = l.location_id
WHERE (o.primary_user_id = $1) OR (o.secondary_user_id = $1);