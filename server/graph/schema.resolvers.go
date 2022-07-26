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
	panic(fmt.Errorf("not implemented"))
}

// AuthUser is the resolver for the authUser field.
func (r *mutationResolver) AuthUser(ctx context.Context, input model.AuthUser) (*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

// CreatePost is the resolver for the createPost field.
func (r *mutationResolver) CreatePost(ctx context.Context, input model.NewPost) (*model.Post, error) {
	panic(fmt.Errorf("not implemented"))
}

// UserPosts is the resolver for the userPosts field.
func (r *queryResolver) UserPosts(ctx context.Context, userID string) ([]*model.Post, error) {
	panic(fmt.Errorf("not implemented"))
}

// Post is the resolver for the post field.
func (r *queryResolver) Post(ctx context.Context, userID string) (*model.Post, error) {
	panic(fmt.Errorf("not implemented"))
}

// User is the resolver for the user field.
func (r *queryResolver) User(ctx context.Context, userID string) (*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
