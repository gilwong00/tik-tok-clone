package models

import (
	db "server/pkg/db/sqlc"
	"server/pkg/utils"
)

type AuthUserRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type AuthUserResponse struct {
	User      db.User          `json:"user"`
	AuthToken *utils.AuthToken `json:"authToken"`
}

type CreateUserRequest struct {
	FirstName string `json:"firstName" binding:"required"`
	LastName  string `json:"lastName"  binding:"required"`
	Email     string `json:"email"  binding:"required,email"`
	Password  string `json:"password" binding:"required"`
}

type CreateUserResponse struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	AvatarUri string `json:"avatarUri"`
}
