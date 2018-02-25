package handlers

import (
	"encoding/json"
	"flex_project/backend/data"
	"strconv"

	"github.com/jinzhu/gorm/dialects/postgres"

	// "log"
	// // "net/http"
	// "github.com/aws/aws-sdk-go/aws"
	// "github.com/aws/aws-sdk-go/aws/session"
	// // "github.com/aws/aws-sdk-go/service/s3"
	// "github.com/aws/aws-sdk-go/aws/credentials"
	// "github.com/aws/aws-sdk-go/service/s3/s3manager"
	// "os"
	"fmt"
	// "net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func CreateExperience(c *gin.Context, db *gorm.DB) {
	exp := data.Experience{}

	// form, _ := c.MultipartForm()
	// file, _ := c.FormFile("file")
	// fmt.Println(file.Filename)
	// // files := form.File["upload[]"]
	// //
	// // for _, file := range files {
	// // 	log.Println(file.Filename)
	// // }
	// c.String(http.StatusOK, "Uploaded...")
	fmt.Printf("c: %+v \n", c)
	err := c.Bind(&exp)
	//Hopefully, after some frontend magic, the context also contains activities

	if err != nil {
		fmt.Printf("err: %+v \n", err)

		c.JSON(400, gin.H{"error": exp})
		return
	}

	// bucket := "experience.images"
	// // file, err := c.FormFile("file")
	// form, err := c.MultipartForm()
	// fmt.Printf("err, %+v\n", err)
	// fmt.Printf("form, %+v\n", form)
	//
	//
	// files := form.File["file"]
	// fmt.Printf("files, %+v\n", files)
	//
	// sess, err := session.NewSession(&aws.Config{
	// 		Region: aws.String("us-west-1"),
	// 		Credentials: credentials.NewStaticCredentials(
	// 			 os.Getenv("AWS_ACCESS_KEY_ID"),
	// 			 os.Getenv("AWS_SECRET_ACCESS_KEY"),
	// 			 "",
	// 			 )})
	//
	//
	// for _, file := range files {
	// 	log.Println(file.Filename)
	// 	filename := file.Filename
	//
	// 	//http://experience.images.s3.amazonaws.com
	//
	// 	// Create S3 service client
	// 	// svc := s3.New(sess)
	// 	fileBody, err := file.Open()
	// 	uploader := s3manager.NewUploader(sess)
	// 	uploader.Upload(&s3manager.UploadInput{
	// 		Bucket: aws.String(bucket),
	// 		Key: aws.String(filename),
	// 		Body: fileBody,
	// 	})
	// 	if err != nil {
	// 			// Print the error and exit.
	// 			fmt.Printf("Unable to upload %q to %q, %v", filename, bucket, err)
	// 	} else {
	// 		fmt.Printf("Successfully uploaded %q to %q\n", filename, bucket)
	//
	// 	}
	//
	// 	// var imageURL = uploadOutput.Location
	// 	// fmt.Printf("URL: %v \n", imageURL)
	// }
	// c.String(http.StatusOK, "Uploaded...")
	fmt.Printf("err, %+v\n", err)
	//
	fmt.Printf("experiment: %T\n", json.RawMessage(c.PostForm("ActivitiesString")))
	fmt.Printf("experiment: %+v\n", c.PostForm("activities"))
	exp.Activities = postgres.Jsonb{(json.RawMessage(c.PostForm("ActivitiesString")))}

	fmt.Printf("exp, %+v \n", exp)

	fmt.Printf("exp.Activities, %+v \n", exp.Activities)
	// exp.Activities = postgres.Jsonb{exp.Activities}
	// fmt.Printf("File: %+v \n", file)
	// fmt.Println("success?")
	db.Create(&exp)
	c.JSON(200, exp)
}

// func UploadActivityPhoto(p *) {
// bucket := "experience.images"
//   filename := "/tmp/image.jpg"
//   sess, err := session.NewSession(&aws.Config{
//       Region: aws.String("us-west-1"),
//       Credentials: credentials.NewStaticCredentials(
//          os.Getenv("AWS_ACCESS_KEY_ID"),
//          os.Getenv("AWS_SECRET_ACCESS_KEY"),
//          "",
//          )})
//
//   //http://experience.images.s3.amazonaws.com
//
//   // Create S3 service client
//   svc := s3.New(sess)
//
// 	uploader := s3manager.NewUploader(sess)
//   uploadOutput, err = uploader.Upload(&s3manager.UploadInput{
//     Bucket: aws.String(bucket),
//     Key: aws.String("/tmp/image.jpg"),
//     Body: file,
//   })
//   if err != nil {
//       // Print the error and exit.
//       exitErrorf("Unable to upload %q to %q, %v", filename, bucket, err)
//   }
//
// 	exp.imageURL = uploadOutput.location
//
//   fmt.Printf("Successfully uploaded %q to %q\n", filename, bucket)
// }

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
	expID := c.Param("expID")

	fmt.Printf("data.experience %v", exp)

	db.Where("ID = ?", expID).First(&exp)
	fmt.Printf("data.experience %v", exp)

	c.JSON(200, exp)
}

func UpdateExperience(c *gin.Context, db *gorm.DB) {

}

func DeleteExperience(c *gin.Context, db *gorm.DB) {

}

func VoteExperience(c *gin.Context, db *gorm.DB) {
	exp := data.Experience{}
	expID := c.Param("id")
	vote, _ := strconv.Atoi(c.Param("vote"))
	db.Where("ID = ?", expID).First(&exp)
	exp.Score += vote
	db.Save(&exp)
}
