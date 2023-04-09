package api

import (
	"database/sql"
	"errors"
	"fmt"
	"net/http"
	db "server/pkg/db/sqlc"
	"server/pkg/models"
	"server/pkg/utils"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (s *Server) AuthUser(ctx *gin.Context) {
	var req models.AuthUserRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, err)
		return
	}
	user, err := s.queries.GetUserByEmail(ctx, req.Email)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, err)
			return
		}
		ctx.JSON(http.StatusInternalServerError, err)
		return
	}
	doesPasswordMatch := utils.ComparePassword(user.Password, req.Password)
	if doesPasswordMatch {
		auth, err := utils.GenerateToken(strconv.Itoa(int(user.ID)))
		if err != nil {
			ctx.JSON(http.StatusNonAuthoritativeInfo, err)
			return
		}
		ctx.JSON(http.StatusOK, models.AuthUserResponse{
			User:      user,
			AuthToken: auth,
		})
		return
	}
	ctx.JSON(http.StatusUnauthorized, errors.New("invalid password"))
}

func (s *Server) CreateUser(ctx *gin.Context) {
	var req models.CreateUserRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, err)
		return
	}
	hashedPassword := utils.HashPassword(req.Password)
	newUser, err := s.queries.CreateUser(ctx, db.CreateUserParams{
		FirstName: req.FirstName,
		LastName:  req.LastName,
		Email:     req.Email,
		Password:  hashedPassword,
	})
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, err)
		return
	}
	ctx.JSON(http.StatusOK, models.UserResponse{
		FirstName: newUser.FirstName,
		LastName:  newUser.LastName,
		Email:     newUser.Email,
		AvatarUri: newUser.AvatarUri.String,
	})
}

func (s *Server) Whoami(ctx *gin.Context) {
	id, exists := ctx.Get("user_id")
	if exists {
		user, err := s.queries.GetUserByID(ctx, id.(int64))
		if err != nil {
			if err == sql.ErrNoRows {
				ctx.JSON(http.StatusNotFound, err)
				return
			}
			ctx.JSON(http.StatusInternalServerError, err)
			return
		}
		ctx.JSON(http.StatusOK, models.UserResponse{
			FirstName: user.FirstName,
			LastName:  user.LastName,
			Email:     user.Email,
			AvatarUri: user.AvatarUri.String,
		})
	}
	ctx.JSON(http.StatusBadRequest, errors.New("no user"))
}

func (s *Server) SearchUsers(ctx *gin.Context) {
	var req models.SearchUserParams
	if err := ctx.ShouldBindUri(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, err)
		return
	}
	userId := ctx.MustGet("user_id").(int64)
	results, err := s.queries.SearchUsers(ctx, db.SearchUsersParams{
		ID:        userId,
		ToTsquery: fmt.Sprintf("%s:*", req.Query),
	})
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, err)
	}
	ctx.JSON(http.StatusOK,
		results,
	)
}
