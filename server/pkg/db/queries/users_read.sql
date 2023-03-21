-- name: GetUserByID :one
SELECT * FROM users
WHERE id = $1;

-- name: GetUserByEmail :one
SELECT * FROM users
WHERE email = $1;

-- TODO improve this query
-- name: SearchUsers :many
SELECT * FROM users
WHERE email LIKE $1 OR first_name LIKE $1;