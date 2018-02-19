package main

import (
	"flex_project/backend/db"
	"flex_project/backend/router"
)

func main() {
	db := db.SetupDB()
	defer db.Close()
	r := router.SetupRouter()
	// Listen and Server in 0.0.0.0:8080
	r.Run(":8080")
}
