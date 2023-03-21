// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.16.0

package db

import (
	"database/sql"
	"time"
)

type Post struct {
	ID           int64
	UserID       int64
	Description  sql.NullString
	Uri          string
	IsActive     bool
	CreatedAt    time.Time
	UpdatedAt    time.Time
	ThumbnailUri sql.NullString
}

type User struct {
	ID        int64
	FirstName sql.NullString
	LastName  sql.NullString
	Email     string
	Password  string
	AvatarUri sql.NullString
	CreatedAt time.Time
	UpdatedAt time.Time
}