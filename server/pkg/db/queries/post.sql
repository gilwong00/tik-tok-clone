-- name: CreatePost :one
INSERT INTO posts (
	user_id,
	description,
	uri,
	thumbnail_uri,
	blob
) VALUES (
	$1, $2, $3, $4, $5
) RETURNING *;