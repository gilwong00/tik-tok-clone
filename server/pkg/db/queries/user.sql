-- name: CreateUser :one
INSERT INTO users (
	first_name,
	last_name,
	email,
	password,
	avatar_uri
) VALUES (
	$1, $2, $3, $4, $5
) ON CONFLICT DO NOTHING
RETURNING *;