// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.16.0
// source: post_read.sql

package db

import (
	"context"
)

const getFeed = `-- name: GetFeed :many
SELECT id, user_id, description, uri, is_active, created_at, updated_at, thumbnail_uri FROM posts
WHERE user_id <> $1
AND id > $2
ORDER BY "id" ASC
LIMIT $3
`

type GetFeedParams struct {
	UserID int64 `json:"userID"`
	ID     int64 `json:"id"`
	Limit  int32 `json:"limit"`
}

func (q *Queries) GetFeed(ctx context.Context, arg GetFeedParams) ([]Post, error) {
	rows, err := q.db.QueryContext(ctx, getFeed, arg.UserID, arg.ID, arg.Limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []Post{}
	for rows.Next() {
		var i Post
		if err := rows.Scan(
			&i.ID,
			&i.UserID,
			&i.Description,
			&i.Uri,
			&i.IsActive,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.ThumbnailUri,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getUserPosts = `-- name: GetUserPosts :many
SELECT id, user_id, description, uri, is_active, created_at, updated_at, thumbnail_uri FROM posts
WHERE user_id = $1
ORDER BY created_at DESC
`

func (q *Queries) GetUserPosts(ctx context.Context, userID int64) ([]Post, error) {
	rows, err := q.db.QueryContext(ctx, getUserPosts, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []Post{}
	for rows.Next() {
		var i Post
		if err := rows.Scan(
			&i.ID,
			&i.UserID,
			&i.Description,
			&i.Uri,
			&i.IsActive,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.ThumbnailUri,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}
