SELECT * FROM user_notification
WHERE user_id = $1 AND notification_status = 'unseen';