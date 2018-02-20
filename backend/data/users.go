package data

import (
	"github.com/jinzhu/gorm"
)

type User struct {
	gorm.Model
	OAuthID string `gorm:"NOT NULL" json:"accessToken"`
	UserID  string `gorm:"UNIQUE;NOT NULL" json:"userID"`
	// Hash     string `gorm:"NOT NULL" json:"Hash"`
	// Token    string `gorm:"NOT NULL" json:"SessionToken"`
}
