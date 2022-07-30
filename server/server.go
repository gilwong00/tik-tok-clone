package main

import (
	"log"
	"net/http"
	"os"
	"server/graph"
	"server/graph/generated"
	"server/pkg/db"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-pg/pg/v10"
	"github.com/joho/godotenv"
)

const defaultPort = "8080"

func main() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error getting env vars", err)
		os.Exit(1)
	}

	DB := db.Init(&pg.Options{
		User:     os.Getenv("DB_USER"),
		Password: os.Getenv("DB_PASSWORD"),
		Database: os.Getenv("DB_NAME"),
	})

	defer DB.Close()

	DB.AddQueryHook((db.Logger{}))

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{
		UserRepository: db.UsersRepository{DB: DB},
		PostRepository: db.PostsRepository{DB: DB},
	}}))

	http.Handle("/graphql", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/graphql for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
