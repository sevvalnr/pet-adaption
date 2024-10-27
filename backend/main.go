package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"gitlab.com/sewalnrkibar/pet-adaption/pet/backend/config"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var jwtKey = []byte("your_secret_key")

type Claims struct {
	UserID string `json:"user_id"`
	jwt.StandardClaims
}

func main() {

	client, err := ConnectDB()
	if err != nil {
		log.Fatal("MongoDB bağlantı hatası:", err)
	}
	defer client.Disconnect(context.Background())

	config.InitializeBirdCollection()
	config.InitializeCatCollection()
	config.InitializeOtherCollection()
	config.InitializeUserCollection()
	config.InitializeDogCollection()

	app := fiber.New()

	app.Use(func(c *fiber.Ctx) error {
		c.Set("Access-Control-Allow-Origin", "http://localhost:3001")
		c.Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
		c.Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		return c.Next()
	})

	app.Use(func(c *fiber.Ctx) error {
		if c.Method() == "OPTIONS" {
			return c.SendStatus(fiber.StatusOK)
		}
		return c.Next()
	})

	UserEndpoints(app)
	PetEndpoints(app)

	log.Fatal(app.Listen(":3000"))
}

func ConnectDB() (*mongo.Client, error) {
	connectionString := "mongodb://localhost:27017"
	clientOptions := options.Client().ApplyURI(connectionString)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		return nil, err
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		return nil, err
	}

	log.Println("MongoDB bağlantısı başarıyla kuruldu")

	return client, nil
}

func ParseToken(tokenString string) (*Claims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	fmt.Println(token, "ParseToken")
	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			return nil, errors.New("Invalid token signature")

		}
		fmt.Println(token, "ParseToken22")
		return nil, err
	}
	if claims, ok := token.Claims.(*Claims); ok && token.Valid {
		return claims, nil
	} else {
		return nil, errors.New("Invalid token claims")
	}
}

func getUserIDFromToken(tokenString string) (string, error) {
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil {
		return "", err
	}
	fmt.Println(token, "tokenn")
	claims, ok := token.Claims.(*Claims)
	if !ok || !token.Valid {
		return "", errors.New("Geçersiz token")

	}
	fmt.Println(token, "tokenn")

	fmt.Println(claims.UserID, "claims.UserID")
	fmt.Println(tokenString, "tokenString33")

	return claims.UserID, nil
}

func UserEndpoints(app *fiber.App) {

	app.Post("/user/add", config.CreateUser)
	app.Put("/user/update/:id", config.UpdateUser)
	app.Delete("/user/delete/:id", config.DeleteUser)
	app.Get("/user/:email", config.GetUser)
	app.Post("/login", config.Login)
}

func PetEndpoints(app *fiber.App) {

	app.Post("/dog/add", config.CreateDog)
	app.Get("/dog", config.GetDogs)
	app.Get("/dog/:userId", config.GetDogsByEmail)
	app.Get("/dog/:id", config.GetDogById)
	app.Get("/dogs/:userId", config.HandleGetDogsByUserID)

	app.Post("/cat/add", config.CreateCat)
	app.Get("/cat", config.GetCats)
	app.Get("/cat/:email", config.GetCatsByEmail)
	app.Delete("/cats:name", config.DeleteCat)
	app.Get("/cats/:userId", config.HandleGetCatsByUserID)

	app.Post("/bird/add", config.CreateBird)
	app.Get("/bird", config.GetBirds)
	app.Get("/bird/:email", config.GetBirdsByEmail)
	app.Get("/birds/:userId", config.HandleGetBirdsByUserID)

	app.Post("/other/add", config.CreateOther)
	app.Get("/other", config.GetOthers)
	app.Get("/other/:email", config.GetOthersByEmail)
	app.Get("/others/:userId", config.HandleGetOthersByUserID)

}
