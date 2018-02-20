package main

import (
	"flex_project/backend/router"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

var r *gin.Engine
var db *gorm.DB

func main() {
	r, db = router.SetupRouterAndDB()
	defer db.Close()

	// Listen and Server in 0.0.0.0:8080
	r.Run(":8080")
}
