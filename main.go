package main

import (
	"flex_project/backend/router"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"

	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

var r *gin.Engine
var db *gorm.DB

func main() {
	r, db = router.SetupRouterAndDB()
	r.Static("/css", "backend/css")
	defer db.Close()

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	secret := os.Getenv("SECRET_KEY")
	fmt.Printf("Secret Key is %v", secret)

	// Listen and Server in 0.0.0.0:8080
	r.Run(":8080")
}
