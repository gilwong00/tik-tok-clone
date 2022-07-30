package db

import (
	"log"
	"server/graph/model"
	"strconv"

	"github.com/go-pg/pg/v10"
)

type PostsRepository struct {
	DB *pg.DB
}

func (p *PostsRepository) GetUsersPosts(userId string) ([]*model.Post, error) {
	var posts []*model.Post
	err := p.DB.Model(&posts).Where("user_id = ?", userId).Order("created_at DESC").Select()

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

func (p *PostsRepository) CreatePost(payload model.NewPost) (*model.Post, error) {
	log.Println("payload", payload)

	userId, _ := strconv.Atoi(payload.UserID)

	newPost := &model.Post{
		UserID:       userId,
		Description:  payload.Description,
		URI:          payload.URI,
		ThumbnailURI: payload.ThumbnailURI,
	}

	_, err := p.DB.Model(newPost).
		Returning("*").
		Insert()

	if err != nil {
		return nil, err
	}

	return newPost, nil
}
