package handlers

import (
	"flex_project/backend/data"
	"strconv"

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

func GetExperiences(c *gin.Context, db *gorm.DB) {
	exps := []data.Experience{}
	quantity, err := strconv.Atoi(c.Query("quantity"))
	if err != nil {
		c.JSON(400, gin.H{"error": "invalid quantity"})
	}
	offset, err := strconv.Atoi(c.Query("offset"))
	if err != nil {
		c.JSON(400, gin.H{"error": "invalid offset"})
	}
	if offset == 0 {
		db.Limit(quantity).Find(&exps).Order("Score desc")
	} else {
		db.Offset(offset).Limit(quantity).Find(&exps).Order("Score desc")
	}
	c.JSON(200, exps)
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
