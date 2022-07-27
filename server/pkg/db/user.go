package db

import (
	"server/graph/model"

	"github.com/go-pg/pg/v10"
)

type UsersRepository struct {
	DB *pg.DB
}

func (u *UsersRepository) CreateUser(newUser model.NewUser) error {

	_, err := u.DB.Model(newUser).
		OnConflict("(id) DO NOTHING").
		Returning("*").
		Insert()

	if err != nil {
		return err
	}

	// ideally we should return the user here so fix this and the return type
	return nil
}

func (u *UsersRepository) GetUser(id int) (*model.Post, error) {
	var user model.User
	err := u.DB.Model(&user).Where("id = ?", id).Select()

	if err != nil {
		return nil, err
	}
	// need to fix return type for when we get a user
	return nil, nil
}
