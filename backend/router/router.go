package router

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	// "github.com/aws/aws-sdk-go/service/s3"
	"flex_project/backend/data"
	"flex_project/backend/handlers"
	"fmt"
	"os"

	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	// "net/http"
	"log"
)

var db *gorm.DB

//SetupRouterAndDB stands up gorm postgres db, inits router
func SetupRouterAndDB() (*gin.Engine, *gorm.DB) {
	r := gin.Default()
	db = data.SetupDB()

	r.LoadHTMLGlob("backend/templates/*.html")

	r.GET("/", handlers.RootHandler)
	//User Routes
	r.POST("/api/users/", wrapHandler(handlers.CreateUser, db))
	// r.PUT("/api/users", )
	// r.GET("/api/users", func(c *gin.Context) {
	// 	users := []data.User{}
	// 	db.Find(&users)
	// 	c.JSON(200, users)
	// })
	//Session Routes
	r.POST("/api/session", wrapHandler(handlers.NewSession, db))
	//Experience routes
	r.POST("/api/experience", wrapHandler(handlers.CreateExperience, db))
	r.DELETE("/api/experience", wrapHandler(handlers.DeleteExperience, db))
	r.PUT("/api/experience", wrapHandler(handlers.UpdateExperience, db))
	r.GET("/api/experiences", wrapHandler(handlers.GetExperiences, db))
	r.GET("/api/experience", wrapHandler(handlers.GetExperience, db))
	r.POST("/api/experiences/:ID/upload", wrapHandler(handlers.UploadActivityPhotos, db))
	r.GET("/api/experience/:expID", wrapHandler(handlers.GetExperience, db))
	r.POST("/api/experience/:expID/vote", wrapHandler(handlers.VoteExperience, db))
	r.POST("/api/test", func(c *gin.Context) {
		bucket := "experience.images"
		// file, err := c.FormFile("file")
		form, err := c.MultipartForm()
		fmt.Printf("err, %+v\n", err)
		fmt.Printf("form, %+v\n", form)
		fmt.Printf("file: %+v\n", form.Value["meta"][1])

		files := form.File["file"]
		fmt.Printf("files, %+v\n", files)

		sess, err := session.NewSession(&aws.Config{
			Region: aws.String("us-west-1"),
			Credentials: credentials.NewStaticCredentials(
				os.Getenv("AWS_ACCESS_KEY_ID"),
				os.Getenv("AWS_SECRET_ACCESS_KEY"),
				"",
			)})

		for _, file := range files {
			log.Println(file.Filename)
			filename := file.Filename

			//http://experience.images.s3.amazonaws.com

			// Create S3 service client
			// svc := s3.New(sess)
			fileBody, err := file.Open()
			uploader := s3manager.NewUploader(sess)
			uploader.Upload(&s3manager.UploadInput{
				Bucket: aws.String(bucket),
				Key:    aws.String(filename),
				Body:   fileBody,
			})
			if err != nil {
				// Print the error and exit.
				// exitErrorf("Unable to upload %q to %q, %v", filename, bucket, err)
			}

			// var imageURL = uploadOutput.Location
			// fmt.Printf("URL: %v \n", imageURL)
			fmt.Printf("Successfully uploaded %q to %q\n", filename, bucket)
		}
		// c.String(http.StatusOK, "Uploaded...")
		fmt.Printf("err, %+v\n", err)
		//
		fmt.Printf("c, %+v \n", c)
		fmt.Printf("c.params, %+v \n", c)

		// fmt.Printf("File: %+v \n", file)
		fmt.Println("success?")

	})
	return r, db
}

//Middleware for handlers to provide DB
func wrapHandler(fn func(*gin.Context, *gorm.DB), db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		fn(c, db)
	}
}
