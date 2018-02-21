package router

import (
	"flex_project/backend/data"
	"flex_project/backend/handlers"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

var db *gorm.DB

//SetupRouterAndDB stands up gorm postgres db, inits router
func SetupRouterAndDB() (*gin.Engine, *gorm.DB) {
	r := gin.Default()
	db = data.SetupDB()

	r.LoadHTMLGlob("backend/templates/*.html")

	r.GET("/", handlers.RootHandler)
	//User Routes
	r.POST("/api/users/", wrapHandler(handlers.CreateUser, db))
	// r.PUT("/api/users", )
	// r.GET("/api/users", func(c *gin.Context) {
	// 	users := []data.User{}
	// 	db.Find(&users)
	// 	c.JSON(200, users)
	// })
	//Session Routes
	r.POST("/api/session", wrapHandler(handlers.NewSession, db))
	//Experience routes
	r.POST("/api/experiences", wrapHandler(handlers.CreateExperience, db))
	r.DELETE("/api/experiences", wrapHandler(handlers.DeleteExperience, db))
	r.PUT("/api/experiences", wrapHandler(handlers.UpdateExperience, db))
	r.GET("/api/experiences", wrapHandler(handlers.GetExperiences, db))
	r.GET("/api/experience", wrapHandler(handlers.GetExperience, db))

	return r, db
}

//Middleware for handlers to provide DB
func wrapHandler(fn func(*gin.Context, *gorm.DB), db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		fn(c, db)
	}
}
