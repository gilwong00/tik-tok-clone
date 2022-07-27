package db

import (
	"context"
	"fmt"

	"github.com/go-pg/pg/v10"
)

type Logger struct{}

func (log Logger) BeforeQuery(ctx context.Context, q *pg.QueryEvent) (context.Context, error) {
	return ctx, nil
}

func (log Logger) AfterQuery(cxt context.Context, q *pg.QueryEvent) error {
	fmt.Println(q.FormattedQuery())
	return nil
}

func Init(opts *pg.Options) *pg.DB {
	return pg.Connect((opts))
}
