package db

import (
	"errors"
	"log"
	"os"
	"server/graph/model"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/go-pg/pg/v10"
	"golang.org/x/crypto/bcrypt"
)

type UsersRepository struct {
	DB *pg.DB
}

// maybe move this to a utils
func hashPassword(password string) string {
	bytePassword := []byte(password)
	passwordHash, err := bcrypt.GenerateFromPassword(bytePassword, bcrypt.DefaultCost)

	if err != nil {
		log.Println("Failed to hash password", err)
		panic(err)
	}

	return string(passwordHash)
}

func comparePassword(userPassword string, password string) bool {
	bytePassword := []byte(password)
	byteHashedPassword := []byte(userPassword)
	err := bcrypt.CompareHashAndPassword(byteHashedPassword, bytePassword)
	return err == nil
}

func generateToken(id string) (*model.AuthToken, error) {
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

	return &model.AuthToken{
		AccessToken: accessToken,
		ExpiredAt:   expiredAt,
	}, nil
}

func (u *UsersRepository) CreateUser(payload model.NewUser) (*model.User, error) {
	log.Println("payload", payload)

	newUser := &model.User{
		FirstName: payload.FirstName,
		LastName:  payload.LastName,
		Email:     payload.Email,
		Password:  hashPassword(payload.Password),
		AvatarURI: "",
	}

	_, err := u.DB.Model(newUser).
		OnConflict("(id) DO NOTHING").
		Returning("*").
		Insert()

	if err != nil {
		return nil, err
	}

	return newUser, nil
}

func (u *UsersRepository) GetUser(id string) (*model.User, error) {
	var user model.User
	err := u.DB.Model(&user).Where("id = ?", id).Select()

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (u *UsersRepository) AuthUser(input model.AuthUser) (*model.AuthResponse, error) {
	log.Println("payload", input)
	var user model.User
	err := u.DB.Model(&user).Where("email = ?", input.Email).First()

	if err != nil {
		return nil, err
	}

	doPasswordMatch := comparePassword(user.Password, input.Password)

	if doPasswordMatch {
		auth, err := generateToken(user.ID)

		if err != nil {
			return nil, err
		}

		return &model.AuthResponse{
			AuthToken: auth,
			User:      &user,
		}, nil
	}

	return nil, errors.New("password do not match")
}

func (u *UsersRepository) SearchUsers(term string) ([]*model.User, error) {
	var users []*model.User

	err := u.DB.Model(&users).
		Where("email LIKE ?", term).
		WhereOr("firstName LIKE ?", term).
		Select()

	if err != nil {
		return nil, err
	}
	return users, nil
}
