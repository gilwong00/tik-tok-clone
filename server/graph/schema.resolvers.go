package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"server/graph/generated"
	"server/graph/model"
)

// CreateUser is the resolver for the createUser field.
func (r *mutationResolver) CreateUser(ctx context.Context, input model.NewUser) (*model.User, error) {
	user, err := r.UserRepository.CreateUser(input)

	if err != nil {
		return nil, err
	}

	return user, nil
}

// AuthUser is the resolver for the authUser field.
func (r *mutationResolver) AuthUser(ctx context.Context, input model.AuthUser) (*model.AuthResponse, error) {
	auth, err := r.UserRepository.AuthUser(input)

	if err != nil {
		return nil, err
	}
	return auth, nil
}

// CreatePost is the resolver for the createPost field.
func (r *mutationResolver) CreatePost(ctx context.Context, input model.NewPost) (*model.Post, error) {
	post, err := r.PostRepository.CreatePost(input)

	if err != nil {
		return nil, err
	}
	return post, nil
}

// UserPosts is the resolver for the userPosts field.
func (r *queryResolver) UserPosts(ctx context.Context, userID string) ([]*model.Post, error) {
	posts, err := r.PostRepository.GetUsersPosts(userID)

	if err != nil {
		return nil, err
	}
	return posts, nil
}

// Post is the resolver for the post field.
func (r *queryResolver) Post(ctx context.Context, userID string) (*model.Post, error) {
	panic(fmt.Errorf("not implemented"))
}

// User is the resolver for the user field.
func (r *queryResolver) User(ctx context.Context, userID string) (*model.User, error) {
	user, err := r.UserRepository.GetUser(userID)

	if err != nil {
		return nil, err
	}

	return user, nil
}

// GetFeed is the resolver for the getFeed field.
func (r *queryResolver) GetFeed(ctx context.Context, userID string, page int, limit int) ([]*model.Post, error) {
	feed, err := r.PostRepository.GetFeed(userID, page, limit)

	if err != nil {
		return nil, err
	}

	return feed, nil
}

// SearchUser is the resolver for the searchUser field.
func (r *queryResolver) SearchUser(ctx context.Context, term string) ([]*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
