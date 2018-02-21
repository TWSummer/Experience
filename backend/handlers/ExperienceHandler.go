package handlers

import (
	"flex_project/backend/data"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func CreateExperience(c *gin.Context, db *gorm.DB) {
	exp := data.Experience{}
	err := c.Bind(&exp)
	if err != nil {
		c.JSON(400, gin.H{"error": exp})
		return
	}
	db.Create(&exp)
	c.JSON(200, exp)
}

func GetExperience(c *gin.Context, db *gorm.DB) {
	exp := data.Experience{}
	err := c.Bind(&exp)
	if err != nil {
		c.JSON(400, gin.H{"error": exp})
		return
	}
	db.Where("ID = ?", exp.ID).First(&exp)
	c.JSON(200, exp)
}

func UpdateExperience(c *gin.Context, db *gorm.DB) {

}

func DeleteExperience(c *gin.Context, db *gorm.DB) {

}
