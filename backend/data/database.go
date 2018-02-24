package data

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"

	"github.com/jinzhu/gorm"
	"github.com/jinzhu/gorm/dialects/postgres"
)

type Activity struct {
	imageUrl    string
	title       string
	lat         float64
	lng         float64
	genre       string
	duration    float64
	description string
}

type ActivityMap map[string]interface{}

func (a ActivityMap) Value() (driver.Value, error) {
	j, err := json.Marshal(a)
	return j, err
}

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
	a1 := Activity{"https://b.zmtcdn.com/data/pictures/3/16844183/011d85755f62ab6ef3b8841f11f1c31f.png", "Meet at Gregoire's", 37.9, -122.5, "Food", 60, "Meet up at this famous French takeout spot to pick up the materials for a tasty picnic. You can't afford to miss out on their delightful potato puffs!"}
	b, err := json.Marshal(a1)
	fmt.Printf("The error is: %v", err)
	fmt.Printf("The value of b is %v", b)
	fmt.Printf("The value of a1 is %v", a1)

	a2 := make(ActivityMap)
	a2["imageUrl"] = "https://b.zmtcdn.com/data/pictures/3/16844183/011d85755f62ab6ef3b8841f11f1c31f.png"
	a2["title"] = "Meet at Gregoire's"
	a2["lat"] = 37.9
	a2["lng"] = -122.5
	a2["genre"] = "Food"
	a2["duration"] = 60
	a2["description"] = "Meet up at this famous French takeout spot to pick up the materials for a tasty picnic. You can't afford to miss out on their delightful potato puffs!"
	fmt.Println("Image url is", a2["imageUrl"])
	fmt.Println("Duration is", a2["duration"])
	b2, err2 := a2.Value()

	fmt.Printf("err2 is %v", err2)
	fmt.Printf("b2 is %v", b2)

	a3 := postgres.Jsonb{json.RawMessage(`{"1": {
		"lat": 37.9,
		"lng": -122.5,
		"imageUrl": "https://b.zmtcdn.com/data/pictures/3/16844183/011d85755f62ab6ef3b8841f11f1c31f.png",
		"title": "Meet at Gregoire's"
		}}`)}

	db.Create(&Experience{UserID: "1", Title: "Test1", Genre: "Test1", Description: "Test1", Duration: 120, Activities: a3})
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
