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

func ValidateAuthToken(UserID, OAuthID string) bool {
	dotEnvErr := godotenv.Load()
	if dotEnvErr != nil {
		log.Fatal("Error loading .env file")
	}
	secret := os.Getenv("FACEBOOK_APP_SECRET")

	url := fmt.Sprintf("https://graph.facebook.com/debug_token?input_token=%v&access_token=867019043470476|%v", OAuthID, secret)
	resp, _ := http.Get(url)
	defer resp.Body.Close()

	contents, _ := ioutil.ReadAll(resp.Body)
	var foo interface{}
	json.Unmarshal(contents, &foo)
	m := foo.(map[string]interface{})
	n := m["data"].(map[string]interface{})
	return (n["user_id"] == UserID && n["app_id"] == "867019043470476")
}

func CreateUser(c *gin.Context, db *gorm.DB) {
	user := data.User{}
	err := c.Bind(&user)
	if err != nil {
		c.JSON(400, gin.H{"error": user})
		return
	}
	if ValidateAuthToken(user.UserID, user.OAuthID) {
		tempUser := data.User{}
		prevUser := db.Where("user_id = ?", user.UserID).First(&tempUser)
		if err := prevUser.RecordNotFound(); !err {
			tempUser.OAuthID = user.UserID
			db.Save(&tempUser)
			c.JSON(200, user)
		} else {
			db.Create(&user)
			c.JSON(200, user)
		}
	} else {
		c.JSON(400, gin.H{"error": "Invalid token"})
		return
	}
}
