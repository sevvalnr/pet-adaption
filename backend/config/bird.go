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

var birdCollection *mongo.Collection

func InitializeBirdCollection() {
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

	birdCollection = client.Database("pet").Collection("bird")
}
func CreateBird(c *fiber.Ctx) error {
	var bird models.Birds
	bird.ID = helpers.GenerateUUID() // Benzersiz ID atama
	if err := c.BodyParser(&bird); err != nil {
		return err
	}
	_, err := birdCollection.InsertOne(context.Background(), bird)
	if err != nil {
		return err
	}
	return c.JSON(bird)
}

func GetBirds(c *fiber.Ctx) error {
	var birds []models.Birds
	cursor, err := birdCollection.Find(context.Background(), bson.M{})
	if err != nil {
		return err
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var bird models.Birds
		if err := cursor.Decode(&bird); err != nil {
			return err
		}
		birds = append(birds, bird)
	}

	if err := cursor.Err(); err != nil {
		return err
	}

	return c.JSON(birds)
}
func GetBirdsByEmail(c *fiber.Ctx) error {
	email := c.Params("email")

	filter := bson.M{"email": email}
	cursor, err := birdCollection.Find(context.Background(), filter)
	if err != nil {

		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch birds",
		})
	}
	defer cursor.Close(context.Background())

	var birds []models.Birds
	if err := cursor.All(context.Background(), &birds); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch birds",
		})
	}

	return c.JSON(birds)
}
