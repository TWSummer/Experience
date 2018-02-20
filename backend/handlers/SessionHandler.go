package handlers

import (
	"flex_project/backend/data"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func NewSession(c *gin.Context, db *gorm.DB) {
	tempUser := data.User{}
	err := c.BindJSON(&tempUser)
	if err != nil {
		c.JSON(404, gin.H{"error": "User not found"})
	}
	user := db.Where("UserID = ?", tempUser.UserID)
	c.JSON(200, user)
}
