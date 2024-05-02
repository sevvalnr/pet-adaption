package main

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var userCollection *mongo.Collection
var petList *mongo.Collection

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

	InitializeUserCollection()
	InitializePetCollection()

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

//user

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

type User struct {
	ID       string `json:"id,omitempty" bson:"_id,omitempty"`
	Email    string `json:"email,omitempty" bson:"email,omitempty"`
	Password string `json:"password,omitempty" bson:"password,omitempty"`
	Location string `json:"location,omitempty" bson:"location,omitempty"`
	Phone    string `json:"phone,omitempty" bson:"phone,omitempty"`
	Username string `json:"username,omitempty" bson:"username,omitempty"`
}

func UpdateUser(c *fiber.Ctx) error {
	id := c.Params("id")
	user := new(User)
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
	user := new(User)
	if err := c.BodyParser(user); err != nil {
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
	var user User
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

// func Login(c *fiber.Ctx) error {

// 	var loginData User
// 	if err := c.BodyParser(&loginData); err != nil {
// 		return err
// 	}

// 	var user User
// 	err := userCollection.FindOne(context.Background(), bson.M{"email": loginData.Email}).Decode(&user)
// 	if err != nil {
// 		if err == mongo.ErrNoDocuments {

// 			return c.Status(http.StatusNotFound).JSON(fiber.Map{
// 				"message": "Kullanıcı bulunamadı",
// 			})
// 		}

// 		log.Println("Kullanıcı alınırken bir hata oluştu:", err)
// 		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{})
// 	}

// 	if loginData.Password != user.Password {

// 		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{})
// 	}

// 	return c.JSON(fiber.Map{
// 		"message": "Giriş başarılı",
// 		"user":    user,
// 	})
// }

func CreateToken(userID string) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour)

	claims := &Claims{
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

	return tokenString, nil
}

func Login(c *fiber.Ctx) error {
	var loginData User
	if err := c.BodyParser(&loginData); err != nil {
		return err
	}

	var user User
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

func UserEndpoints(app *fiber.App) {

	app.Post("/user/add", CreateUser)
	app.Put("/user/update/:id", UpdateUser)
	app.Delete("/user/delete/:id", DeleteUser)
	app.Get("/user/:email", GetUser)
	app.Post("/login", Login)
}

//adaption

func InitializePetCollection() {
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

	petList = client.Database("pet").Collection("pet")
}

type Pet struct {
	ID     string `json:"id,omitempty" bson:"_id,omitempty"`
	Name   string `json:"name,omitempty" bson:"name,omitempty"`
	Type   string `json:"type,omitempty" bson:"type,omitempty"`
	Age    int    `json:"age,omitempty" bson:"age,omitempty"`
	Gender string `json:"gender,omitempty" bson:"gender,omitempty"`
	//Images []Image `json:"images,omitempty" bson:"images,omitempty"`
	OwnerEmail string `json:"ownerEmail,omitempty" bson:"ownerEmail,omitempty"`
}

// type Image struct {
// 	URL  string `json:"url,omitempty" bson:"url,omitempty"`
// 	Type string `json:"type,omitempty" bson:"type,omitempty"`
// }

func CreatePet(c *fiber.Ctx) error {
	userEmail := c.Locals("userEmail").(string)

	pet := new(Pet)
	if err := c.BodyParser(pet); err != nil {
		return err
	}
	pet.OwnerEmail = userEmail

	// Pet belgesini veritabanına ekle
	_, err := petList.InsertOne(context.Background(), pet)
	if err != nil {
		return err
	}
	return c.JSON(pet)
}
func PetEndpoints(app *fiber.App) {

	app.Post("/pet/add", CreatePet)
	app.Put("/user/pet/:id", UpdateUser)
	app.Delete("/user/delete/:id", DeleteUser)
	app.Get("/user/:email", GetUser)
}
