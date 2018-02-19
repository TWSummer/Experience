package db

type User struct {
	ID           uint   `gorm:"primary_key" json:"id"`
	Username     string `gorm:"UNIQUE;NOT NULL" json:"-"`
	Hash         string `gorm:"NOT NULL" json:"-"`
	SessionToken string `gorm:"NOT NULL" json:"-"`
}
