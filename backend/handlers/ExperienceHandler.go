package handlers

import (
	"flex_project/backend/data"
	"strconv"
	// "log"
	"net/http"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func CreateExperience(c *gin.Context, db *gorm.DB) {
	exp := data.Experience{}
	// form, _ := c.MultipartForm()
	file, _ := c.FormFile("file")
	fmt.Println(file.Filename)
	// files := form.File["upload[]"]
  //
	// for _, file := range files {
	// 	log.Println(file.Filename)
	// }
	c.String(http.StatusOK, "Uploaded...")
	err := c.Bind(&exp)
	//Hopefully, after some frontend magic, the context also contains activities
	//Each activity has an associate image or file that will be returned.

	if err != nil {
		c.JSON(400, gin.H{"error": exp})
		return
	}
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
