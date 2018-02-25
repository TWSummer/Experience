package handlers

import (
	"flex_project/backend/data"
	"strconv"
	"encoding/json"

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
	db.Create(&exp)
	c.JSON(200, exp)
}

func UploadActivityPhotos(c *gin.Context, db *gorm.DB) {
	exp := data.Experience{}
  // Below returns a string, must be converted
	// c.Params["ID"]
	db.Where("ID = ?", 1).First(&exp)
	fmt.Printf("exp, %+v\n", exp)
	var foo interface{}

	activities := exp.Activities.RawMessage
	fmt.Printf("activities, %+v\n", activities)
	fmt.Printf("activities type, %T\n", activities)
	// fmt.Printf("activities err, %+v\n", err)
	// activities = []byte(activities)


	json.Unmarshal(activities, &foo)
	m := foo.(map[string]interface{})
	fmt.Printf("m, %+v\n", m)
	fmt.Printf("m, %+v\n", "sdfkjsdhfkjsdhfkjsdhf")

	fmt.Printf("m:1, %+v \n", m["1"])
	n := m["1"].(map[string]interface{})
	fmt.Printf("m:1, %+v \n", n)





	dotEnvErr := godotenv.Load()
	if dotEnvErr != nil {
		log.Fatal("Error loading .env file")
	}
	form, formErr := c.MultipartForm()

	fmt.Printf("form err, %+v\n", formErr)
	fmt.Printf("form, %+v\n", form)


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
		fmt.Printf("uploadOutput err, %+v\n", err2)


		fmt.Printf("imgUrl, %v\n", uploadOutput.Location)
		n := m[data[index]].(map[string]interface{})
		n["ImageUrl"] = uploadOutput.Location
		if err != nil {
			// Print the error and exit.
			// exitErrorf("Unable to upload %q to %q, %v", filename, bucket, err)
		}
		m[data[index]] = n
		// exp.Activities =

		// var imageURL = uploadOutput.Location
		// fmt.Printf("URL: %v \n", imageURL)
		fmt.Printf("activity, %+v\n", n)

		fmt.Printf("activities, %+v\n", m)
		marshalM, err := json.Marshal(m)
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
	fmt.Printf("data.experience %v", exp)

	db.Where("ID = ?", exp.ID).First(&exp)
	fmt.Printf("data.experience %v", exp)

	c.JSON(200, exp)
}

func UpdateExperience(c *gin.Context, db *gorm.DB) {

}

func DeleteExperience(c *gin.Context, db *gorm.DB) {

}
