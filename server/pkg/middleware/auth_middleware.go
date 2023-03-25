package middleware

import (
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func AuthMiddleware(ctx *gin.Context) {
	token := strings.Split(ctx.Request.Header["Authorization"][0], " ")[1]
	claims := jwt.MapClaims{}
	keyFunc := func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	}
	_, err := jwt.ParseWithClaims(token, claims, keyFunc)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, err)
		return
	}
	// jti is the really the ID we signed the claim with but gets renamed
	userId := claims["jti"].(string)
	id, err := strconv.ParseInt(userId, 10, 64)
	// throw an error if cannot properly auth header
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, err)
		return
	}
	ctx.Set("user_id", id)
	ctx.Next()
}
