package router

import (
	"flex_project/backend/data"
	"flex_project/backend/handlers"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

var db *gorm.DB

func SetupRouterAndDB() (*gin.Engine, *gorm.DB) {
	r := gin.Default()
	db = data.SetupDB()
	db.DropTable(&data.User{})
	db.CreateTable(&data.User{})
	db.AutoMigrate(&data.User{})
	r.LoadHTMLGlob("backend/templates/*.html")

	r.GET("/", handlers.RootHandler)

	//User Routes
	r.POST("/api/users", wrapHandler(handlers.CreateUser, db))
	// r.PUT("/api/users", )

	// r.GET("/api/users", func(c *gin.Context) {
	// 	users := []data.User{}
	// 	db.Find(&users)
	// 	c.JSON(200, users)
	// })

	//Session Routes
	r.POST("/api/session", wrapHandler(handlers.NewSession, db))

	//Experience routes
	r.POST("/api/experiences", handlers.RootHandler)

	r.DELETE("/api/experiences", handlers.RootHandler)

	r.PUT("/api/experiences", handlers.RootHandler)

	r.GET("/api/experiences", handlers.RootHandler)

	return r, db
}

//Middleware for handlers to provide DB
func wrapHandler(fn func(*gin.Context, *gorm.DB), db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		fn(c, db)
	}
}
