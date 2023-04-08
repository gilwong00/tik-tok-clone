-- name: GetUserByID :one
SELECT
	id,
	first_name,
	last_name,
	email,
	avatar_uri,
	created_at FROM users
WHERE id = $1;

-- name: GetUserByEmail :one
SELECT
	id,
	first_name,
	last_name,
	email,
	password,
	avatar_uri,
	created_at
FROM users
WHERE email = $1;

-- name: SearchUsers :many
WITH unique_users AS (
	SELECT * FROM users
	WHERE id <> $1
)
SELECT
	id,
	first_name,
	last_name,
	email,
	avatar_uri,
	created_at
FROM unique_users
WHERE ts @@ to_tsquery('english', $2)
ORDER BY ts_rank(ts, to_tsquery('english', $2)) DESC;