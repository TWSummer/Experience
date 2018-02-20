package router

import (
	"encoding/json"
	"flex_project/backend/data"
	"flex_project/backend/handlers"
	"fmt"
	"io/ioutil"
	"net/http"

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

	return r, db
}
