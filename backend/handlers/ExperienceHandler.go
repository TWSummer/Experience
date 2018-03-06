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
	"fmt"
	"math/rand"
	"os"

	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/joho/godotenv"
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


	exp.Activities = postgres.Jsonb{(json.RawMessage(c.PostForm("ActivitiesString")))}
	exp.Score = 1
	db.Create(&exp)
	c.JSON(200, exp)
}

func UploadActivityPhotos(c *gin.Context, db *gorm.DB) {
	exp := data.Experience{}
	db.Where("ID = ?", c.Param("expID")).First(&exp)

	var foo interface{}
	activitiesRaw := exp.Activities.RawMessage
	json.Unmarshal(activitiesRaw, &foo)
	activitiesMap := foo.(map[string]interface{})

	dotEnvErr := godotenv.Load()
	if dotEnvErr != nil {
		log.Fatal("Error loading .env file")
	}
	form, formErr := c.MultipartForm()
	if formErr != nil {
		fmt.Printf("form err, %+v\n", formErr)
		fmt.Printf("c:, %+v\n", c)

		return
	}
	data := form.Value["data"]
	files := form.File["file"]
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

		// Create S3 service client
		// svc := s3.New(sess)
		fileBody, _ := file.Open()

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

		fmt.Printf("Successfully uploaded %q to %q\n", filename, bucket)
	}
	marshalM, err := json.Marshal(activitiesMap)
	fmt.Printf("err, %+v\n", err)
	exp.Activities = postgres.Jsonb{json.RawMessage(marshalM)}

	db.Save(&exp)
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
	user := data.User{}
	subtractScore := 0.0
	expID, err := strconv.Atoi(c.Param("expID"))
	if err != nil {
		c.JSON(400, gin.H{"error": "invalid experience id"})
	} else {
		vote, err := strconv.Atoi(c.PostForm("voteValue"))
		if err != nil || vote != 1 && vote != -1 {
			c.JSON(400, gin.H{"error": "invalid vote value"})
		} else {
			userID := c.PostForm("userID")
			if userID == "" {
				c.JSON(400, gin.H{"error": "must be logged in to vote"})
			} else {
				fmt.Printf("userID = %+v", userID)

				db.Where("user_id = ?", userID).First(&user)
				fmt.Printf("user = %+v", user)
				var foo interface{}
				userRaw := user.Votes.RawMessage
				json.Unmarshal(userRaw, &foo)
				var votes postgres.Jsonb
				if foo == nil {
					votes = postgres.Jsonb{json.RawMessage(fmt.Sprintf(`{"%v": %v}`, expID, vote))}
				} else {
					userMap := foo.(map[string]interface{})
					if userMap[c.Param("expID")] != nil {
						subtractScore = userMap[c.Param("expID")].(float64)
					}
					userMap[c.Param("expID")] = vote
					marshalM, err := json.Marshal(userMap)
					if err != nil {
						votes = postgres.Jsonb{userRaw}
						fmt.Println("YOU HAVE ENCOUNTERED AN ERROR!")
					} else {
						votes = postgres.Jsonb{json.RawMessage(marshalM)}
					}
				}
				user.Votes = votes
				db.Where("ID = ?", expID).First(&exp)
				exp.Score += vote - int(subtractScore)
				db.Save(&user)
				db.Save(&exp)
				c.JSON(200, exp)
			}
		}
	}
}

func Search(c *gin.Context, db *gorm.DB) {
	query := c.Param("query")
	query = "%" + query + "%"
	exps := []data.Experience{}
	quantity := 25
	db.Where("UPPER(Title) LIKE UPPER(?) OR UPPER(Description) LIKE UPPER(?) OR UPPER(Genre) LIKE UPPER(?)", query, query, query).Limit(quantity).Order("Score desc").Find(&exps)
	c.JSON(200, exps)
}
