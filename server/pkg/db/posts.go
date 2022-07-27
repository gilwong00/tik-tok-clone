package db

import (
	"server/graph/model"

	"github.com/go-pg/pg/v10"
)

type PostsRepository struct {
	DB *pg.DB
}

func (p *PostsRepository) GetUsersPosts(userId int) ([]*model.Post, error) {
	var posts []*model.Post
	err := p.DB.Model(&posts).Where("user_id = ?", userId).Select()

	if err != nil {
		return nil, err
	}
	return posts, nil
}

func (p *PostsRepository) GetFeed(userId string, page int, limit int) ([]*model.Post, error) {
	var posts []*model.Post
	err := p.DB.Model(&posts).
		Where("user_id <> ?", userId).
		Limit(limit).
		Offset(limit * page).
		Select()

	if err != nil {
		return nil, err
	}
	return posts, nil
}
