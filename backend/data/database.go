package data

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

func SetupDB() *gorm.DB {
	db, err := gorm.Open("postgres", "user=postgres password=password dbname=flexproject sslmode=disable")
	if err != nil {
		panic("Cannot connect to DB")
	}
	return db
}
