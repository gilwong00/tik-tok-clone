// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.16.0
// source: user.sql

package db

import (
	"context"
	"database/sql"
)

const createUser = `-- name: CreateUser :one
INSERT INTO users (
	first_name,
	last_name,
	email,
	password,
	avatar_uri
) VALUES (
	$1, $2, $3, $4, $5
) ON CONFLICT DO NOTHING
RETURNING id, first_name, last_name, email, password, avatar_uri, created_at, updated_at
`

type CreateUserParams struct {
	FirstName string         `json:"firstName"`
	LastName  string         `json:"lastName"`
	Email     string         `json:"email"`
	Password  string         `json:"password"`
	AvatarUri sql.NullString `json:"avatarUri"`
}

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (User, error) {
	row := q.db.QueryRowContext(ctx, createUser,
		arg.FirstName,
		arg.LastName,
		arg.Email,
		arg.Password,
		arg.AvatarUri,
	)
	var i User
	err := row.Scan(
		&i.ID,
		&i.FirstName,
		&i.LastName,
		&i.Email,
		&i.Password,
		&i.AvatarUri,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}
