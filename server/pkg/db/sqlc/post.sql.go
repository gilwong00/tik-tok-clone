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
	thumbnail_uri,
	blob
) VALUES (
	$1, $2, $3, $4, $5
) RETURNING id, user_id, description, uri, is_active, created_at, updated_at, thumbnail_uri, blob
`

type CreatePostParams struct {
	UserID       int64          `json:"userID"`
	Description  sql.NullString `json:"description"`
	Uri          string         `json:"uri"`
	ThumbnailUri sql.NullString `json:"thumbnailUri"`
	Blob         []byte         `json:"blob"`
}

func (q *Queries) CreatePost(ctx context.Context, arg CreatePostParams) (Post, error) {
	row := q.db.QueryRowContext(ctx, createPost,
		arg.UserID,
		arg.Description,
		arg.Uri,
		arg.ThumbnailUri,
		arg.Blob,
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
		&i.Blob,
	)
	return i, err
}
