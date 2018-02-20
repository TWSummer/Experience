package router

import (
	"net/http"
	"fmt"
	"io/ioutil"
	"encoding/json"
	"flex_project/backend/data"
	"flex_project/backend/handlers"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	// Disable Console Color
	// gin.DisableConsoleColor()
	r := gin.Default()
	db := data.SetupDB()
	defer db.Close()
	r.LoadHTMLFiles("/Users/Patrick/go/src/flex_project/backend/templates/root.html")

	type Test struct {
		test int
	}

	r.GET("/test", func(c *gin.Context) {
		userID := "EAAMUjJoZAfIwBACHlmS2tcLPuOXDrluZBqiF1LCBdfuiByCZCjNP6nUHG3JWx6sx7YLSm8tODuIrYZCQ7eWkAs7kxQf0Wzfcy9slxjX0JBrmfoBVxFago1ZCl3yBhtRENGWc9mSpsMgOGSZAlSJNTcHqWsS2avRSbqiXQ5vZAOhVhqWDeLbpz8OwYv3gHglv8ILFMyWrdIgsQZDZD"

		url := fmt.Sprintf("https://graph.facebook.com/debug_token?input_token=%v&access_token=867019043470476|8ff4a2c7cb4900eae302baf8f01139ba", userID)
		resp, _ := http.Get(url)
		contents, _ := ioutil.ReadAll(resp.Body)


		var foo interface{}
		err2 := json.Unmarshal(contents, &foo)
		m := foo.(map[string]interface{})
		n := m["data"].(map[string]interface{})
		fmt.Printf("resp: %v", n["user_id"])
		fmt.Printf("resp: %v", n["app_id"])

		fmt.Printf("err2: %v", err2)

	})

	r.GET("/", handlers.RootHandler)

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
		users := []data.User{}
		db.Find(&users)
		c.JSON(200, users)
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

	//Experience routes
	r.POST("/api/experiences", func(c *gin.Context) {
		tester := &Test{test: 99}
		c.JSON(200, tester)
	})

	r.DELETE("/api/experiences", func(c *gin.Context) {
		tester := &Test{test: 99}
		c.JSON(200, tester)
	})

	r.PUT("/api/experiences", func(c *gin.Context) {
		tester := &Test{test: 99}
		c.JSON(200, tester)
	})

	r.GET("/api/experiences", func(c *gin.Context) {
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
