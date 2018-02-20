package handlers

import (
	"encoding/json"
	"flex_project/backend/data"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/joho/godotenv"
)

func CreateUser(c *gin.Context, db *gorm.DB) {
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
}
