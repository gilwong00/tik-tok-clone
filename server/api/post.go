package api

import (
	"net/http"
	db "server/pkg/db/sqlc"
	"server/pkg/models"
	"server/pkg/utils"

	"github.com/gin-gonic/gin"
)

func (s *Server) CreatePost(ctx *gin.Context) {
	var req models.CreatePostRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, err)
		return
	}
	newPost, err := s.queries.CreatePost(ctx, db.CreatePostParams{
		UserID:       req.UserID,
		Description:  utils.NewNullString(req.Description),
		Uri:          req.Uri,
		ThumbnailUri: utils.NewNullString(req.ThumbnailUri),
	})
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, err)
		return
	}
	ctx.JSON(http.StatusOK, models.CreatePostResponse{
		ID:           newPost.ID,
		UserID:       newPost.UserID,
		Description:  newPost.Description.String,
		Uri:          newPost.Uri,
		ThumbnailUri: newPost.ThumbnailUri.String,
		IsActive:     newPost.IsActive,
		CreatedAt:    newPost.CreatedAt,
	})
}

func (s *Server) GetFeed(ctx *gin.Context) {
	var req any
	if err := ctx.ShouldBindUri(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, err)
		return
	}
	id := ctx.MustGet("user_id").(int64)
	feed, err := s.queries.GetFeed(ctx, db.GetFeedParams{
		UserID: id,
	})
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, err)
		return
	}
	ctx.JSON(http.StatusOK, feed)
}
