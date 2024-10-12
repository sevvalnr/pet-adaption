package config

import (
	"context"
	"log"

	"github.com/gofiber/fiber/v2"
	"gitlab.com/sewalnrkibar/pet-adaption/pet/backend/helpers"
	"gitlab.com/sewalnrkibar/pet-adaption/pet/backend/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var otherCollection *mongo.Collection

func InitializeOtherCollection() {
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

	otherCollection = client.Database("pet").Collection("other")
}
func CreateOther(c *fiber.Ctx) error {
	var other models.Other
	other.ID = helpers.GenerateUUID() // Benzersiz ID atama
	if err := c.BodyParser(&other); err != nil {
		return err
	}
	_, err := otherCollection.InsertOne(context.Background(), other)
	if err != nil {
		return err
	}
	return c.JSON(other)
}

func GetOthers(c *fiber.Ctx) error {
	var others []models.Other
	cursor, err := otherCollection.Find(context.Background(), bson.M{})
	if err != nil {
		return err
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var other models.Other
		if err := cursor.Decode(&other); err != nil {
			return err
		}
		others = append(others, other)
	}

	if err := cursor.Err(); err != nil {
		return err
	}

	return c.JSON(others)
}
func GetOthersByEmail(c *fiber.Ctx) error {
	email := c.Params("email")

	filter := bson.M{"email": email}
	cursor, err := dogCollection.Find(context.Background(), filter)
	if err != nil {

		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch others",
		})
	}
	defer cursor.Close(context.Background())

	var others []models.Other
	if err := cursor.All(context.Background(), &others); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch others",
		})
	}

	return c.JSON(others)
}
