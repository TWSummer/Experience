package main

import (
    "github.com/aws/aws-sdk-go/aws"
    "github.com/aws/aws-sdk-go/aws/session"
    "github.com/aws/aws-sdk-go/service/s3"
    "github.com/aws/aws-sdk-go/aws/credentials"
    "github.com/aws/aws-sdk-go/service/s3/s3manager"
    "fmt"
    "os"
    "net/http"

    // "io"
    "log"

)

func exitErrorf(msg string, args ...interface{}) {
    fmt.Fprintf(os.Stderr, msg+"\n", args...)
    os.Exit(1)
}

func main() {
  bucket := "experience.images"
  filename := "cat.gifv"
  sess, err := session.NewSession(&aws.Config{
      Region: aws.String("us-west-1"),
      Credentials: credentials.NewStaticCredentials(
         os.Getenv("AWS_ACCESS_KEY_ID"),
         os.Getenv("AWS_SECRET_ACCESS_KEY"),
         "",
         )})

  //http://experience.images.s3.amazonaws.com

  // Create S3 service client
  svc := s3.New(sess)

  result, err := svc.ListBuckets(nil)
  if err != nil {
      exitErrorf("Unable to list buckets, %v", err)
  }

  fmt.Println("Buckets:")

  for _, b := range result.Buckets {
      fmt.Printf("* %s created on %s\n",
          aws.StringValue(b.Name), aws.TimeValue(b.CreationDate))
  }

  resp, err := svc.ListObjects(&s3.ListObjectsInput{Bucket: aws.String(bucket)})
  if err != nil {
    exitErrorf("Unable to list items in bucket %q, %v", bucket, err)
  }

  for _, item := range resp.Contents {
      fmt.Println("Name:         ", *item.Key)
      fmt.Println("Last modified:", *item.LastModified)
      fmt.Println("Size:         ", *item.Size)
      fmt.Println("Storage class:", *item.StorageClass)
      fmt.Println("")
  }

  url := "http://i.imgur.com/m1UIjW1.jpg"
  // don't worry about errors
  response, e := http.Get(url)
  if e != nil {
      log.Fatal(e)
  }

  defer response.Body.Close()

  //open a file for writing
  file, err := os.Open(filename)
  if err != nil {
      log.Fatal(err)
  }
  // // Use io.Copy to just dump the response body to the file. This supports huge files
  // _, err = io.Copy(file, response.Body)
  // if err != nil {
  //     log.Fatal(err)
  // }
  // file.Close()
  fmt.Println("Success! %v", file)
  uploader := s3manager.NewUploader(sess)
  _, err = uploader.Upload(&s3manager.UploadInput{
    Bucket: aws.String(bucket),
    Key: aws.String(filename),
    Body: file,
  })
  if err != nil {
      // Print the error and exit.
      exitErrorf("Unable to upload %q to %q, %v", filename, bucket, err)
  }

  fmt.Printf("Successfully uploaded %q to %q\n", filename, bucket)

  // defer os.Remove("/tmp/image.jpg")

}
