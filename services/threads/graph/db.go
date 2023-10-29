package graph

import (
	"context"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)
func Connect() *pgxpool.Pool {
    connStr := os.Getenv("PG_CONNECTION_STRING")
    if connStr == "" {
        connStr = "postgres://postgres:postgrespassword@host.docker.internal:8432/postgres"
    }
    db, err := pgxpool.New(context.Background(), connStr)
   
   if err != nil {
       panic(err)
   }

   return db
}