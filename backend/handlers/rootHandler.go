package handlers

import (
	"net/http"
	"os"
	"log"
	"github.com/joho/godotenv"
	"github.com/gin-gonic/gin"
)

func RootHandler(c *gin.Context) {
	dotEnvErr := godotenv.Load()
	if dotEnvErr != nil {
		log.Fatal("Error loading .env file")
	}

	c.HTML(http.StatusOK, "root.tmpl.html", gin.H{
		"title": "Main webSIITTEE",
		"appID": os.Getenv("FACEBOOK_APP_ID"),
	})
}
