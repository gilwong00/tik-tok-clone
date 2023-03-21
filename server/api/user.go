package api

import (
	"database/sql"
	"net/http"
	db "server/pkg/db/sqlc"
	"server/pkg/utils"
	"strconv"

	"github.com/gin-gonic/gin"
)

type authUserRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type authUserResponse struct {
	User      db.User          `json:"user"`
	AuthToken *utils.AuthToken `json:"authToken"`
}

func (s *Server) AuthUser(ctx *gin.Context) {
	var req authUserRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, err)
		return
	}
	user, err := s.db.GetUserByEmail(ctx, req.Email)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, err)
			return
		}
		ctx.JSON(http.StatusNonAuthoritativeInfo, err)
		return
	}
	doesPasswordMatch := utils.ComparePassword(user.Password, req.Password)
	if doesPasswordMatch {
		auth, err := utils.GenerateToken(strconv.Itoa(int(user.ID)))
		if err != nil {
			ctx.JSON(http.StatusNonAuthoritativeInfo, err)
			return
		}
		ctx.JSON(http.StatusOK, &authUserResponse{
			User:      user,
			AuthToken: auth,
		})
		return
	}
}
