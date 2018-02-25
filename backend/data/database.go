package data

import (
	"encoding/json"
	"fmt"

	"github.com/jinzhu/gorm"
	"github.com/jinzhu/gorm/dialects/postgres"
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

	activities1 := postgres.Jsonb{json.RawMessage(`{"1": {
				"ID": 1,
				"Lat": 37.9,
				"Lng": -122.6,
				"ImageUrl": "https://b.zmtcdn.com/data/pictures/3/16844183/011d85755f62ab6ef3b8841f11f1c31f.png",
				"Title": "Meet at Gregoire's",
				"Genre": "Food",
				"Duration": 60,
				"Description": "Meet up at this famous French takeout spot to pick up the materials for a tasty picnic. You can't afford to miss out on their delightful potato puffs!"
			},
			"2": {
				"ID": 2,
				"Lat": 37.9,
				"Lng": -122.55,
				"ImageUrl": "https://www.cycleworld.com/sites/cycleworld.com/files/styles/2000_1x_/public/images/2017/10/2018-suzuki-gsx-s750-hero.jpg?itok=9oc76nHH&fc=50,50",
				"Title": "Motorcycle Ride to the Berkeley Hills",
				"Genre": "Transit",
				"Duration": 20,
				"Description": "Take your date on a thrilling ride up into Berkeley's famous hills, just north of UC Berkeley's campus. Enjoy a fantastc view of both sides of the Bay."
			},
			"3": {
				"ID": 3,
				"Lat": 37.7747,
				"Lng": -122.43,
				"ImageUrl": "http://2.bp.blogspot.com/-W8wEx8paoU4/VgIr838Bb8I/AAAAAAAAIdI/4z58zv36hrQ/s1600/wtd90.jpg",
				"Title": "Hiking in the Berkeley Hills",
				"Genre": "Views",
				"Duration": 60,
				"Description": "Climb up a variety of scenic trails in the cool Berkeley air. My personal favorite route is (Andrew tell me what it is because I didn't do any of this at Cal)"
			},
			"4": {
				"ID": "4",
				"Lat": 37.79,
				"Lng": -121.95,
				"ImageUrl": "https://www.phillymag.com/wp-content/uploads/sites/3/2016/05/picnic.jpg",
				"Title": "Hillside Picnic",
				"Genre": "Food",
				"Duration": 40,
				"Description": "Dig in to the food you picked up earlier in the day. Hope you were patient! In these unfortunately drought filled times, at least you're likely to get a clear view wherever you look!"
			}
		}`)}

	db.Create(&Experience{UserID: "1", Title: "North Berkeley Date Night", Genre: "Romantic", Description: "A casual but romantic night out exploring the natural beauty of the East Bay. Start in North Berkeley's famed gourmet ghetto, wind your way up to the Berkeley hills, and enjoy the sights as you chow down on a hillside picnic", Duration: 180, Activities: activities1})
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
