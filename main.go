package main

import (
	"flex_project/backend/router"

	"github.com/gin-gonic/gin"
)

var r *gin.Engine

func main() {
	r = router.SetupRouter()
	r.Static("/css", "backend/css")
	// Listen and Server in 0.0.0.0:8080
	r.Run(":8080")
}
