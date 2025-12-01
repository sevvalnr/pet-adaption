package config

import (
	"context"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"

	"gitlab.com/sewalnrkibar/pet-adaption/pet/backend/helpers"
	"gitlab.com/sewalnrkibar/pet-adaption/pet/backend/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var catCollection *mongo.Collection

func InitializeCatCollection() {
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

	catCollection = client.Database("pet").Collection("cat")
}
func CreateCat(c *fiber.Ctx) error {
	var cat models.Cats
	cat.PetID = helpers.GenerateUUID()
	if err := c.BodyParser(&cat); err != nil {
		return err
	}
	_, err := catCollection.InsertOne(context.Background(), cat)
	if err != nil {
		return err
	}
	return c.JSON(cat)
}

func GetCats(c *fiber.Ctx) error {
	var cats []models.Cats // Değişti: bir dilim (slice) tanımladık
	cursor, err := catCollection.Find(context.Background(), bson.M{})
	if err != nil {
		return err
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var cat models.Cats
		if err := cursor.Decode(&cat); err != nil {
			return err
		}
		cats = append(cats, cat)
	}

	if err := cursor.Err(); err != nil {
		return err
	}

	return c.JSON(cats)
}
func GetCatsByEmail(c *fiber.Ctx) error {
	email := c.Params("email")

	filter := bson.M{"email": email}
	cursor, err := catCollection.Find(context.Background(), filter)
	if err != nil {

		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch cats",
		})
	}
	defer cursor.Close(context.Background())

	var cats []models.Cats
	if err := cursor.All(context.Background(), &cats); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch cats",
		})
	}

	return c.JSON(cats)
}
func GetCatById(c *fiber.Ctx) error {
	id := c.Params("id")

	filter := bson.M{"id": id}
	cursor, err := dogCollection.Find(context.Background(), filter)
	if err != nil {

		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch cats by id",
		})
	}
	defer cursor.Close(context.Background())

	var cats []models.Cats
	if err := cursor.All(context.Background(), &cats); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch cats",
		})
	}

	return c.JSON(cats)
}
func DeleteCat(c *fiber.Ctx) error {
	// Parametre olarak gelen kedi ismini al
	name := c.Params("name")

	// Veritabanında kedi ismiyle eşleşen bir kaydı sil
	res, err := catCollection.DeleteOne(context.Background(), bson.M{"name": name})
	if err != nil {
		return err
	}

	// Silinen kayıt olmadığını kontrol et
	if res.DeletedCount == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "Cat not found"})
	}

	// Başarı durumunu döndür
	return c.JSON(fiber.Map{"message": "Cat deleted successfully"})
}
func HandleGetCatsByUserID(c *fiber.Ctx) error {
	userId := c.Params("userId")

	filter := bson.M{"user_id": userId}
	var cats []models.Cats

	cursor, err := catCollection.Find(context.TODO(), filter)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Bir hata oluştu",
		})
	}
	defer cursor.Close(context.Background())

	if err := cursor.All(context.TODO(), &cats); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Veriler alınamadı",
		})
	}

	return c.JSON(cats)
}
func HandleGetCatByPetId(c *fiber.Ctx) error {
	petId := c.Params("petId")

	filter := bson.M{"petId": petId}
	var cat models.Cats
	fmt.Println(petId, "petID")
	err := catCollection.FindOne(context.TODO(), filter).Decode(&cat)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"error": "Kedi bulunamadı",
			})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Bir hata oluştu",
		})
	}
	fmt.Println(cat, "cat")

	return c.JSON(cat)
}
