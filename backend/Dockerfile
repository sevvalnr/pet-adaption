# Back-end için Dockerfile
FROM golang:1.20 AS builder
WORKDIR /app
COPY ./backend/go.mod ./backend/go.sum ./
RUN go mod download
COPY ./backend ./
RUN go build -o main .

FROM ubuntu:latest
WORKDIR /app
COPY --from=builder /app/main ./
CMD ["./main"]
