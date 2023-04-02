package main

import (
	"database/sql"
	"log"
	"os"
	"server/api"
	db "server/pkg/db/sqlc"

	"github.com/joho/godotenv"

	_ "github.com/lib/pq"
)

const defaultPort = "8080"

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error getting env vars", err)
		os.Exit(1)
	}
	conn, err := sql.Open(os.Getenv("DB_DRIVER"), os.Getenv("DB_SOURCE"))
	if err != nil {
		log.Fatal("failed to connect to postgres", err)
		os.Exit(1)
	}
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}
	queries := db.New(conn)
	server, err := api.NewServer(port, queries)
	if err != nil {
		log.Fatal("failed to connect to start server", err)
	}
	server.Start()
}
