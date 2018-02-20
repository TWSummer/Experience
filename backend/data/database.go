package data

import (
	"fmt"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

func SetupDB() *gorm.DB {
	db, err := gorm.Open("postgres", "user=postgres password=password dbname=flexproject sslmode=disable")
	if err != nil {
		panic(fmt.Sprintf("Cannot connect to DB %v", err))
	}
	return db
}
