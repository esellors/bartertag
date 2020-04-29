SELECT * FROM offer_message
WHERE offer_id = ANY (ARRAY [$1])
ORDER BY time_of_message DESC;