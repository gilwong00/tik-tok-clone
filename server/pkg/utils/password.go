package utils

import (
	"log"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

type AuthToken struct {
	AccessToken string    `json:"accessToken"`
	ExpiredAt   time.Time `json:"expiredAt"`
}

func HashPassword(password string) string {
	bytePassword := []byte(password)
	passwordHash, err := bcrypt.GenerateFromPassword(bytePassword, bcrypt.DefaultCost)
	if err != nil {
		log.Println("Failed to hash password", err)
		panic(err)
	}
	return string(passwordHash)
}

func ComparePassword(userPassword string, password string) bool {
	bytePassword := []byte(password)
	byteHashedPassword := []byte(userPassword)
	err := bcrypt.CompareHashAndPassword(byteHashedPassword, bytePassword)
	return err == nil
}

func GenerateToken(id string) (*AuthToken, error) {
	expiredAt := time.Now().Add(time.Hour * 24) // one day token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		ExpiresAt: expiredAt.Unix(),
		Id:        id,
		IssuedAt:  time.Now().Unix(),
		Issuer:    "tiktokclone",
	})
	accessToken, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return nil, err
	}
	return &AuthToken{
		AccessToken: accessToken,
		ExpiredAt:   expiredAt,
	}, nil
}
