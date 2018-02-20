package main

import (
	"flex_project/backend/router"

	"github.com/gin-gonic/gin"
)

var r *gin.Engine

func main() {
	r = router.SetupRouter()
	// Listen and Server in 0.0.0.0:8080
	r.Run(":8080")
}
