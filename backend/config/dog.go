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

var dogCollection *mongo.Collection

func InitializeDogCollection() {
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

	dogCollection = client.Database("pet").Collection("dog")
}

func CreateDog(c *fiber.Ctx) error {
	var dog models.Dogs
	dog.ID = helpers.GenerateUUID() // Bu satırı güncelleyerek büyük harfle başlatın
	if err := c.BodyParser(&dog); err != nil {
		return err
	}

	_, err := dogCollection.InsertOne(context.Background(), dog)
	if err != nil {
		return err
	}

	return c.JSON(dog)
}
func GetDogs(c *fiber.Ctx) error {
	var dogs []models.Dogs
	cursor, err := dogCollection.Find(context.Background(), bson.M{})
	if err != nil {
		return err
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var dog models.Dogs
		if err := cursor.Decode(&dog); err != nil {
			return err
		}
		dogs = append(dogs, dog)
	}

	if err := cursor.Err(); err != nil {
		return err
	}

	return c.JSON(dogs)
}
func GetDogsByEmail(c *fiber.Ctx) error {
	email := c.Params("email")

	filter := bson.M{"email": email}
	cursor, err := dogCollection.Find(context.Background(), filter)
	if err != nil {

		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch dogs",
		})
	}
	defer cursor.Close(context.Background())

	var dogs []models.Dogs
	if err := cursor.All(context.Background(), &dogs); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch dogs",
		})
	}

	return c.JSON(dogs)
}
func GetDogById(c *fiber.Ctx) error {
	id := c.Params("id")

	filter := bson.M{"id": id}
	cursor, err := dogCollection.Find(context.Background(), filter)
	if err != nil {

		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch dogs by id",
		})
	}
	defer cursor.Close(context.Background())

	var dogs []models.Dogs
	if err := cursor.All(context.Background(), &dogs); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch dogs",
		})
	}

	return c.JSON(dogs)
}
