package config

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"gitlab.com/sewalnrkibar/pet-adaption/pet/backend/helpers"
	"gitlab.com/sewalnrkibar/pet-adaption/pet/backend/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var userCollection *mongo.Collection
var jwtKey = []byte("your_secret_key")

func InitializeUserCollection() {
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal("MongoDB bağlantı hatası:", err)
	}
	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal("MongoDB sunucusuna ping atılamadı:", err)
	}
	log.Println("Connected to MongoDB!")

	userCollection = client.Database("pet").Collection("user")
}
func UpdateUser(c *fiber.Ctx) error {
	id := c.Params("id")
	user := new(models.User)
	if err := c.BodyParser(user); err != nil {
		return err
	}
	_, err := userCollection.UpdateOne(context.Background(), bson.M{"_id": id}, bson.M{"$set": user})
	if err != nil {
		return err
	}
	return c.JSON(user)
}

func DeleteUser(c *fiber.Ctx) error {
	id := c.Params("id")
	_, err := userCollection.DeleteOne(context.Background(), bson.M{"_id": id})
	if err != nil {
		return err
	}
	return c.SendStatus(fiber.StatusNoContent)
}

func CreateUser(c *fiber.Ctx) error {
	var user models.User
	user.ID = helpers.GenerateUUID() // Benzersiz ID atama
	if err := c.BodyParser(&user); err != nil {
		return err
	}
	_, err := userCollection.InsertOne(context.Background(), user)
	if err != nil {
		return err
	}
	return c.JSON(user)
}

func GetUser(c *fiber.Ctx) error {
	email := c.Params("email")
	var user models.User
	err := userCollection.FindOne(context.Background(), bson.M{"email": email}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return c.Status(fiber.StatusNotFound).SendStatus(fiber.StatusNotFound)
		}
		log.Println(err)
		return c.Status(fiber.StatusInternalServerError).SendStatus(fiber.StatusInternalServerError)
	}
	return c.JSON(user)
}
func CreateToken(userID string) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour)

	claims := &models.Claims{
		UserID: userID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
			IssuedAt:  time.Now().Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		return "", err
	}

	fmt.Println(token, "tokenn33")
	fmt.Println(tokenString, "tokenString")

	return tokenString, nil
}
func Login(c *fiber.Ctx) error {
	var loginData models.User
	if err := c.BodyParser(&loginData); err != nil {
		return err
	}

	var user models.User
	err := userCollection.FindOne(context.Background(), bson.M{"email": loginData.Email}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return c.Status(http.StatusNotFound).JSON(fiber.Map{
				"message": "Kullanıcı bulunamadı",
			})
		}

		log.Println("Kullanıcı alınırken bir hata oluştu:", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{})
	}

	if loginData.Password != user.Password {
		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{
			"message": "Kullanıcı adı veya şifre yanlış",
		})
	}

	token, err := CreateToken(user.ID)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{})
	}

	c.Cookie(&fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		HTTPOnly: true,
		Secure:   true,
	})

	return c.JSON(fiber.Map{
		"message": "Giriş başarılı",
		"user":    user,
	})
}
