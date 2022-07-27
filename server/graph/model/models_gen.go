// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type AuthUser struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type NewPost struct {
	UserID      string `json:"userId"`
	URI         string `json:"uri"`
	Description string `json:"description"`
}

type NewUser struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

type Post struct {
	ID          string `json:"id"`
	UserID      int    `json:"userId"`
	Description string `json:"description"`
	URI         string `json:"uri"`
	IsActive    bool   `json:"isActive"`
	CreatedAt   string `json:"createdAt"`
	UpdatedAt   string `json:"updatedAt"`
}

type User struct {
	ID        string `json:"id"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	AvatarURI string `json:"avatarUri"`
	CreatedAt string `json:"createdAt"`
	UpdatedAt string `json:"updatedAt"`
}
