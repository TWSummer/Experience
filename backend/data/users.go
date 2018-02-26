package data

import (
	"github.com/jinzhu/gorm"
	"github.com/jinzhu/gorm/dialects/postgres"
)

type User struct {
	gorm.Model
	OAuthID string         `gorm:"NOT NULL" json:"AccessToken"`
	UserID  string         `gorm:"UNIQUE;NOT NULL" json:"UserID"`
	Votes   postgres.Jsonb `json:"Activities"`
	// Hash     string `gorm:"NOT NULL" json:"Hash"`
	// Token    string `gorm:"NOT NULL" json:"SessionToken"`
}
