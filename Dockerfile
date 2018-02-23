
FROM golang

ARG app_env
ENV APP_ENV $app_env

WORKDIR /go/src/flex_project
COPY . .

RUN go get ./
RUN go install -v ./...
RUN go build


EXPOSE 8080
