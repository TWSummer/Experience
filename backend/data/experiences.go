package data

import (
	"github.com/jinzhu/gorm"
	"github.com/jinzhu/gorm/dialects/postgres"
)

type Experience struct {
	gorm.Model
	Title          string         `gorm:"NOT NULL" json:"Title"`
	UserID         string         `gorm:"NOT NULL" json:"UserID"`
	UserName       string         `json:"UserName"`
	UserPictureURL string         `json:"UserPictureURL"`
	Description    string         `json:"Description"`
	Genre          string         `json:"Genre"`
	Score          int            `gorm:"NOT NULL" json:"Score"`
	Activities     postgres.Jsonb `json:"Activities"`
	Duration       int            `json:"Duration"`
}
