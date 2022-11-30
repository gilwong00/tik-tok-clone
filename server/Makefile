gqlgen:
	go run github.com/99designs/gqlgen generate

sqlc:
	sqlc generate

migrate-create:
	migrate create -ext sql -dir pkg/db/migrations

migrate-up:
	migrate -path "pkg/db/migrations" -database "postgres://postgres:postgres@localhost:5432/tik_tok_clone?sslmode=disable" up

.PHONY: gqlgen sqlc migrate-create migrate-up