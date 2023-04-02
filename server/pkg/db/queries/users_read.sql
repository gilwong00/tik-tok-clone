-- name: GetUserByID :one
SELECT * FROM users
WHERE id = $1;

-- name: GetUserByEmail :one
SELECT * FROM users
WHERE email = $1;

-- TODO improve this query
-- name: SearchUsers :many
WITH unique_users AS (
	SELECT * FROM users
	WHERE id <> $1
)
SELECT * FROM unique_users
WHERE email LIKE $2 OR first_name LIKE $2;