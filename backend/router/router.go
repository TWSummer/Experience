package router

import (
	"flex_project/backend/data"
	"flex_project/backend/handlers"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func SetupRouterAndDB() (*gin.Engine, *gorm.DB) {
	r := gin.Default()
	db := data.SetupDB()
	db.DropTable(&data.User{})
	db.CreateTable(&data.User{})
	db.AutoMigrate(&data.User{})
	r.LoadHTMLFiles("/Users/andrewblum/go/src/flex_project/backend/templates/root.html")

	type Test struct {
		test int
	}

	r.GET("/", handlers.RootHandler)

	//User Routes
	r.POST("/api/users", func(c *gin.Context) {
		user := data.User{}
		err := c.BindJSON(&user)
		if err != nil {
			c.JSON(400, gin.H{"error": user})
			return
		}
		db.Create(&user)
		c.JSON(200, user)
	})

	// r.PUT("/api/users", func(c *gin.Context) {
	// 	tester := &Test{test: 99}
	// 	c.JSON(200, tester)
	// })

	// r.GET("/api/users", func(c *gin.Context) {
	// 	users := []data.User{}
	// 	db.Find(&users)
	// 	c.JSON(200, users)
	// })

	//Session Routes
	r.POST("/api/session", func(c *gin.Context) {
		tempUser := data.User{}
		err := c.BindJSON(&tempUser)
		if err != nil {
			c.JSON(404, gin.H{"error": "User not found"})
		}
		user := db.Where("UserID = ?", tempUser.UserID)
		c.JSON(200, user)
	})

	// r.DELETE("/api/users", func(c *gin.Context) {
	// 	tester := &Test{test: 99}
	// 	c.JSON(200, tester)
	// })

	//Experince routes
	r.POST("/api/experinces", func(c *gin.Context) {
		tester := &Test{test: 99}
		c.JSON(200, tester)
	})

	r.DELETE("/api/experinces", func(c *gin.Context) {
		tester := &Test{test: 99}
		c.JSON(200, tester)
	})

	r.PUT("/api/experinces", func(c *gin.Context) {
		tester := &Test{test: 99}
		c.JSON(200, tester)
	})

	r.GET("/api/experinces", func(c *gin.Context) {
		tester := &Test{test: 99}
		c.JSON(200, tester)
	})

	return r, db
}
