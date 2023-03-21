-- name: GetUserPosts :many
SELECT * FROM posts
WHERE user_id = $1
ORDER BY created_at DESC;

-- name: GetFeed :many
SELECT * FROM posts
WHERE user_id <> $1
LIMIT $2
OFFSET $3;