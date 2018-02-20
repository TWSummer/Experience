package data

import (
	"github.com/jinzhu/gorm"
)

type Vote struct {
	gorm.Model
	ExperinceID string `gorm:"NOT NULL" json:"ExperinceID"`
	UserID      string `gorm:"UNIQUE;NOT NULL" json:"UserID"`
	UpVote      bool   `gorm:"NOT NULL" json:"UpVote"`
}
