package data

import (
	"github.com/jinzhu/gorm"
)

type User struct {
	gorm.Model
	OAuthID string `gorm:"NOT NULL" json:"AccessToken"`
	UserID  string `gorm:"UNIQUE;NOT NULL" json:"UserID"`
	// Hash     string `gorm:"NOT NULL" json:"Hash"`
	// Token    string `gorm:"NOT NULL" json:"SessionToken"`
}
