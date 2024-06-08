# Golang image'i kullanarak build aşaması
FROM golang:alpine AS builder
WORKDIR /app
COPY . .
RUN go mod download
RUN go build -o main .

# Final image
FROM alpine
WORKDIR /app
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]
