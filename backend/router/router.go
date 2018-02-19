package router

import (
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	// Disable Console Color
	// gin.DisableConsoleColor()
	r := gin.Default()

	type Test struct {
		test int
	}

	r.GET("/", func(c *gin.Context) {
		tester := &Test{test: 99}
		c.JSON(200, tester)
	})

	//User Routes
	r.POST("/api/users", func(c *gin.Context) {
		tester := &Test{test: 99}
		c.JSON(200, tester)
	})

	r.PUT("/api/users", func(c *gin.Context) {
		tester := &Test{test: 99}
		c.JSON(200, tester)
	})

	r.GET("/api/users", func(c *gin.Context) {
		tester := &Test{test: 99}
		c.JSON(200, tester)
	})

	//Session Routes
	r.POST("/api/session", func(c *gin.Context) {
		tester := &Test{test: 99}
		c.JSON(200, tester)
	})

	r.DELETE("/api/users", func(c *gin.Context) {
		tester := &Test{test: 99}
		c.JSON(200, tester)
	})

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

	// // Ping test
	// r.GET("/ping", func(c *gin.Context) {
	// 	c.String(200, "pong")
	// })
	//
	// // Get user value
	// r.GET("/user/:name", func(c *gin.Context) {
	// 	user := c.Params.ByName("name")
	// 	value, ok := DB[user]
	// 	if ok {
	// 		c.JSON(200, gin.H{"user": user, "value": value})
	// 	} else {
	// 		c.JSON(200, gin.H{"user": user, "status": "no value"})
	// 	}
	// })
	//
	// // Authorized group (uses gin.BasicAuth() middleware)
	// // Same than:
	// // authorized := r.Group("/")
	// // authorized.Use(gin.BasicAuth(gin.Credentials{
	// //	  "foo":  "bar",
	// //	  "manu": "123",
	// //}))
	// authorized := r.Group("/", gin.BasicAuth(gin.Accounts{
	// 	"foo":  "bar", // user:foo password:bar
	// 	"manu": "123", // user:manu password:123
	// }))
	//
	// authorized.POST("admin", func(c *gin.Context) {
	// 	user := c.MustGet(gin.AuthUserKey).(string)
	//
	// 	// Parse JSON
	// 	var json struct {
	// 		Value string `json:"value" binding:"required"`
	// 	}
	//
	// 	if c.Bind(&json) == nil {
	// 		DB[user] = json.Value
	// 		c.JSON(200, gin.H{"status": "ok"})
	// 	}
	// })

	return r
}
