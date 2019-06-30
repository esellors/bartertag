UPDATE user_notification
SET notification_status = 'seen'
WHERE user_id = $1;