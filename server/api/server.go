package api

import (
	"fmt"
	db "server/pkg/db/sqlc"
	"server/pkg/middleware"

	"github.com/gin-gonic/gin"
)

type Server struct {
	queries *db.Queries
	port    string
	router  *gin.Engine
}

func NewServer(port string, queries *db.Queries) (*Server, error) {
	server := &Server{
		port:    port,
		queries: queries,
	}
	server.initRoutes()
	return server, nil
}

func (server *Server) initRoutes() {
	router := gin.Default()
	router.Use(gin.LoggerWithFormatter(middleware.GinLogger))
	api := router.Group("/api")

	//user routes
	api.POST("/user/create", server.CreateUser)
	api.POST("/user/auth", server.AuthUser)
	api.Use(middleware.AuthMiddleware).GET("/user/whoami", server.Whoami)

	//post routes
	api.Use(middleware.AuthMiddleware).GET("/feed", server.GetFeed)
	api.Use(middleware.AuthMiddleware).POST("/feed/create", server.CreatePost)

	server.router = router
}

func (s *Server) Start() error {
	return s.router.Run(fmt.Sprintf(":%s", s.port))
}
