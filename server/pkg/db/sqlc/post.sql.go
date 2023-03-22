// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.15.0
// source: post.sql

package db

import (
	"context"
	"database/sql"
)

const createPost = `-- name: CreatePost :one
INSERT INTO posts (
	user_id,
	description,
	uri,
	thumbnail_uri
) VALUES (
	$1, $2, $3, $4
) RETURNING id, user_id, description, uri, is_active, created_at, updated_at, thumbnail_uri
`

type CreatePostParams struct {
	UserID       int64          `json:"userID"`
	Description  sql.NullString `json:"description"`
	Uri          string         `json:"uri"`
	ThumbnailUri sql.NullString `json:"thumbnailUri"`
}

func (q *Queries) CreatePost(ctx context.Context, arg CreatePostParams) (Post, error) {
	row := q.db.QueryRowContext(ctx, createPost,
		arg.UserID,
		arg.Description,
		arg.Uri,
		arg.ThumbnailUri,
	)
	var i Post
	err := row.Scan(
		&i.ID,
		&i.UserID,
		&i.Description,
		&i.Uri,
		&i.IsActive,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.ThumbnailUri,
	)
	return i, err
}
