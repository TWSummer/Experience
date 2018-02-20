package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func RootHandler(c *gin.Context) {
	c.HTML(http.StatusOK, "root.tmpl.html", gin.H{
		"title": "Main webSIITTEE",
	})
}
