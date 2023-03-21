package api

import (
	"fmt"
	"net/http"
	db "server/pkg/db/sqlc"
	"server/pkg/middleware"

	"github.com/gin-gonic/gin"
)

type Server struct {
	db     *db.Queries
	port   string
	router *gin.Engine
}

func NewServer(port string, db *db.Queries) (*Server, error) {
	server := &Server{
		port: port,
		db:   db,
	}
	server.initRoutes()
	return server, nil
}

func (server *Server) initRoutes() {
	router := gin.Default()
	router.Use(gin.LoggerWithFormatter(middleware.GinLogger))
	api := router.Group("/api")

	api.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	server.router = router
}

func (s *Server) Start() error {
	return s.router.Run(fmt.Sprintf(":%s", s.port))
}
