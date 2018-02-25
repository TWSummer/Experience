package handlers

import (
	"encoding/json"
	"flex_project/backend/data"
	"strconv"

	"github.com/jinzhu/gorm/dialects/postgres"

	"log"
	// "net/http"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	// "github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/joho/godotenv"
	"math/rand"
	"os"
	"fmt"
	// "net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func CreateExperience(c *gin.Context, db *gorm.DB) {

	exp := data.Experience{}


	fmt.Printf("c: %+v \n", c)
	err := c.Bind(&exp)

	if err != nil {
		fmt.Printf("err: %+v \n", err)

		c.JSON(400, gin.H{"error": exp})
		return
	}


	fmt.Printf("err, %+v\n", err)

	fmt.Printf("experiment: %+v\n", c.PostForm("activities"))
	exp.Activities = postgres.Jsonb{(json.RawMessage(c.PostForm("ActivitiesString")))}

	fmt.Printf("exp, %+v \n", exp)

	fmt.Printf("exp.Activities, %+v \n", exp.Activities)
	// exp.Activities = postgres.Jsonb{exp.Activities}
	// fmt.Printf("File: %+v \n", file)
	// fmt.Println("success?")
	exp.Score = 1
	db.Create(&exp)
	c.JSON(200, exp)
}

func UploadActivityPhotos(c *gin.Context, db *gorm.DB) {
	exp := data.Experience{}
	db.Where("ID = ?", expID := c.Param("ID")).First(&exp)

	var foo interface{}
	activitiesRaw := exp.Activities.RawMessage
	json.Unmarshal(activitiesRaw, &foo)
	activitiesMap := foo.(map[string]interface{})
	activityMap := activitiesMap["1"].(map[string]interface{})

	dotEnvErr := godotenv.Load()
	if dotEnvErr != nil {
		log.Fatal("Error loading .env file")
	}
	form, formErr := c.MultipartForm()
	if formErr != nil {
		fmt.Printf("form err, %+v\n", formErr)
	}



	//data is an array containing activity ids for the files
	data := form.Value["data"]
	fmt.Printf("data: %+v\n", data)
	files := form.File["file"]
	fmt.Printf("files, %+v\n", files)
	bucket := "experience.images"

	sess, err := session.NewSession(&aws.Config{
		Region: aws.String("us-west-1"),
		Credentials: credentials.NewStaticCredentials(
			os.Getenv("AWS_ACCESS_KEY_ID"),
			os.Getenv("AWS_SECRET_ACCESS_KEY"),
			"",
		)})

	for index, file := range files {
		log.Println(file.Filename)
		filename := file.Filename
		fmt.Printf("index: %v\n", index)
		//http://experience.images.s3.amazonaws.com

		// Create S3 service client
		// svc := s3.New(sess)
		fileBody, err := file.Open()
		fmt.Printf("fileOpen err, %+v\n", err)

		uploader := s3manager.NewUploader(sess)
		var uploadOutput, err2 = uploader.Upload(&s3manager.UploadInput{
			Bucket: aws.String(bucket),
			Key:    aws.String(fmt.Sprintf("%v%v", rand.Int(), filename)),
			Body:   fileBody,
		})
		if err2 != nil {
			fmt.Printf("uploadOutput err, %+v\n", err2)

		}
		fmt.Printf("imgUrl, %v\n", uploadOutput.Location)
		activityMap := activitiesMap[data[index]].(map[string]interface{})
		activityMap["ImageUrl"] = uploadOutput.Location
		activitiesMap[data[index]] = activityMap

		marshalM, err := json.Marshal(activitiesMap)
		fmt.Printf("err, %+v\n", err)



		fmt.Printf("Successfully uploaded %q to %q\n", filename, bucket)
	}
	exp.Activities = postgres.Jsonb{json.RawMessage(marshalM)}
	fmt.Printf("exp, %+v\n", exp)

	// c.String(http.StatusOK, "Uploaded...")
	// dog := []byte
	// json.RawMessage(m)
	fmt.Printf("err, %+v\n", err)
	//
	fmt.Printf("c, %+v \n", c)
	fmt.Printf("c.params, %+v \n", c)

	// fmt.Printf("File: %+v \n", file)
	fmt.Println("success?")

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
		db.Limit(quantity).Order("Score desc").Find(&exps)
	} else {
		db.Offset(offset).Limit(quantity).Order("Score desc").Find(&exps)
	}
	c.JSON(200, exps)
}

func GetExperience(c *gin.Context, db *gorm.DB) {
	exp := data.Experience{}
	expID := c.Param("expID")
	db.Where("ID = ?", expID).First(&exp)
	c.JSON(200, exp)
}

func UpdateExperience(c *gin.Context, db *gorm.DB) {

}

func DeleteExperience(c *gin.Context, db *gorm.DB) {

}

func VoteExperience(c *gin.Context, db *gorm.DB) {
	exp := data.Experience{}
	expID, err := strconv.Atoi(c.Param("expID"))
	if err != nil {
		c.JSON(400, gin.H{"error": "invalid experience id"})
	}
	vote, err := strconv.Atoi(c.PostForm("voteValue"))
	if err != nil || vote != 1 && vote != -1 {
		c.JSON(400, gin.H{"error": "invalid vote value"})
	}
	db.Where("ID = ?", expID).First(&exp)
	exp.Score += vote
	db.Save(&exp)
	c.JSON(200, exp)
}
