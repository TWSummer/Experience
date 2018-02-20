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

	"log"
	"os"

	"github.com/joho/godotenv"
)

func SetupRouterAndDB() (*gin.Engine, *gorm.DB) {
	r := gin.Default()
	db := data.SetupDB()
	db.DropTable(&data.User{})
	db.CreateTable(&data.User{})
	db.AutoMigrate(&data.User{})
	// r.LoadHTMLFiles("/home/theodore/go/src/flex_project/backend/templates/root.tmpl.html")
	r.LoadHTMLGlob("backend/templates/*.html")

	type Test struct {
		test int
	}

	r.GET("/", handlers.RootHandler)

	//User Routes
	r.POST("/api/users", func(c *gin.Context) {
		user := data.User{}
		err := c.Bind(&user)
		if err != nil {
			c.JSON(400, gin.H{"error": user})
			return
		}

		dotEnvErr := godotenv.Load()
		if dotEnvErr != nil {
			log.Fatal("Error loading .env file")
		}
		secret := os.Getenv("FACEBOOK_APP_SECRET")

		url := fmt.Sprintf("https://graph.facebook.com/debug_token?input_token=%v&access_token=867019043470476|%v", c.PostForm("OAuthID"), secret)
		resp, _ := http.Get(url)
		contents, _ := ioutil.ReadAll(resp.Body)
		var foo interface{}
		json.Unmarshal(contents, &foo)
		m := foo.(map[string]interface{})
		n := m["data"].(map[string]interface{})
		if n["user_id"] == c.PostForm("UserID") && n["app_id"] == "867019043470476" {
			db.Create(&user)
			c.JSON(200, user)
		} else {
			c.JSON(400, gin.H{"error": "Invalid token"})
			return
		}

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
