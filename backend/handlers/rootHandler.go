package handlers

import (
	"github.com/gin-gonic/gin"
)

type Test struct {
	test bool
}

func rootHandler(c *gin.Context) {
	tester := &Test{test: true}
	c.JSON(200, tester)
}
