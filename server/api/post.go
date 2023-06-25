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
		Blob:         []byte(req.Blob),
	})
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, err)
		return
	}
	ctx.IndentedJSON(http.StatusOK, models.CreatePostResponse{
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
	var req models.GetFeedParams
	if err := ctx.ShouldBindUri(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, err)
		return
	}
	userId := ctx.MustGet("user_id").(int64)
	feeds, err := s.queries.GetFeed(ctx, db.GetFeedParams{
		UserID: userId,
		ID:     req.Cursor,
		Limit:  50,
	})
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, err)
		return
	}
	f, c := paginateFeed(feeds, req.Limit)
	ctx.IndentedJSON(http.StatusOK, models.GetFeedResponse{
		Feed:   f,
		Cursor: c,
	})
}

func paginateFeed(feed []db.Post, limit int32) ([]db.Post, int64) {
	if len(feed) == 0 || limit == 0 {
		return feed, 0
	}
	if len(feed) > int(limit) {
		return feed[:limit], feed[limit-1].ID
	}
	return feed, 0
}
