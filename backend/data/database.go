package data

import (
	"fmt"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

func SetupDB() *gorm.DB {
	//for OSX docker container
	// postgresOptions := fmt.Sprintf("host=%v user=postgres password=password dbname=flexproject sslmode=disable", os.Getenv("DB_HOST"))
	// db, err := gorm.Open("postgres", postgresOptions)
	db, err := gorm.Open("postgres", "user=postgres password=password dbname=flexproject sslmode=disable")
	if err != nil {
		panic(fmt.Sprintf("Cannot connect to DB %v", err))
	}
	db.DropTable(&User{})
	db.CreateTable(&User{})
	db.AutoMigrate(&User{})
	db.DropTable(&Experience{})
	db.CreateTable(&Experience{})
	db.AutoMigrate(&Experience{})
	db.DropTable(&Vote{})
	db.CreateTable(&Vote{})
	db.AutoMigrate(&Vote{})
	seedExp(db)
	return db
}

func seedExp(db *gorm.DB) {
	db.Create(&Experience{UserID: "1", Title: "Test1", Genre: "Test1", Description: "Test1", Duration: 120})
	db.Create(&Experience{UserID: "2", Title: "Test2", Genre: "Test2", Description: "Test2", Duration: 120})
	db.Create(&Experience{UserID: "3", Title: "Test3", Genre: "Test3", Description: "Test3", Duration: 120})
	db.Create(&Experience{UserID: "4", Title: "Test4", Genre: "Test4", Description: "Test4", Duration: 120})
	db.Create(&Experience{UserID: "5", Title: "Test5", Genre: "Test1", Description: "Test1", Duration: 120})
	db.Create(&Experience{UserID: "6", Title: "Test6", Genre: "Test1", Description: "Test1", Duration: 120})
	db.Create(&Experience{UserID: "7", Title: "Test7", Genre: "Test1", Description: "Test1", Duration: 120})
	db.Create(&Experience{UserID: "8", Title: "Test8", Genre: "Test1", Description: "Test1", Duration: 120})
	db.Create(&Experience{UserID: "9", Title: "Test9", Genre: "Test1", Description: "Test1", Duration: 120})
	db.Create(&Experience{UserID: "10", Title: "Test10", Genre: "Test1", Description: "Test1", Duration: 120})
	db.Create(&Experience{UserID: "11", Title: "Test11", Genre: "Test1", Description: "Test1", Duration: 120})
	db.Create(&Experience{UserID: "12", Title: "Test12", Genre: "Test1", Description: "Test1", Duration: 120})
	db.Create(&Experience{UserID: "13", Title: "Test13", Genre: "Test1", Description: "Test1", Duration: 120})
	db.Create(&Experience{UserID: "14", Title: "Test14", Genre: "Test1", Description: "Test1", Duration: 120})
	db.Create(&Experience{UserID: "15", Title: "Test15", Genre: "Test1", Description: "Test1", Duration: 120})
	db.Create(&Experience{UserID: "16", Title: "Test16", Genre: "Test1", Description: "Test1", Duration: 120})
	db.Create(&Experience{UserID: "17", Title: "Test17", Genre: "Test1", Description: "Test1", Duration: 120})
	db.Create(&Experience{UserID: "18", Title: "Test18", Genre: "Test1", Description: "Test1", Duration: 120})
	db.Create(&Experience{UserID: "19", Title: "Test19", Genre: "Test1", Description: "Test1", Duration: 120})
	db.Create(&Experience{UserID: "20", Title: "Test20", Genre: "Test1", Description: "Test1", Duration: 120})
	db.Create(&Experience{UserID: "21", Title: "Test21", Genre: "Test1", Description: "Test1", Duration: 120})
}
