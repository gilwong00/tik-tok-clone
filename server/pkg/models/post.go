package models

import (
	db "server/pkg/db/sqlc"
	"time"
)

type CreatePostRequest struct {
	UserID       int64  `json:"userId" binding:"required"`
	Description  string `json:"description,omitempty"`
	Uri          string `json:"uri" binding:"required"`
	ThumbnailUri string `json:"thumbnailUri,omitempty"`
}

type CreatePostResponse struct {
	ID           int64     `json:"id"`
	UserID       int64     `json:"userId"`
	Description  string    `json:"description"`
	Uri          string    `json:"uri"`
	ThumbnailUri string    `json:"thumbnailUri"`
	IsActive     bool      `json:"isActive"`
	CreatedAt    time.Time `json:"createdAt"`
}

type GetFeedParams struct {
	Limit  int32 `json:"limit"`
	Cursor int64 `json:"cursor"`
}

type GetFeedResponse struct {
	Feed   []db.Post `json:"feed"`
	Cursor int64     `json:"cursor,omitempty"`
}
