package main

import (
	"context"
	"errors"
	"fmt"
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
var dogCollection *mongo.Collection
var catCollection *mongo.Collection
var birdCollection *mongo.Collection
var otherCollection *mongo.Collection

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
	InitializeDogCollection()
	InitializeCatCollection()
	InitializeBirdCollection()
	InitializeOtherCollection()

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

// Kedi koleksiyonunu başlatma işlevi
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

// Kuş koleksiyonunu başlatma işlevi
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

// Diğer hayvan koleksiyonunu başlatma işlevi
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

type User struct {
	ID       string  `json:"id,omitempty" bson:"_id,omitempty"`
	Email    string  `json:"email,omitempty" bson:"email,omitempty"`
	Password string  `json:"password,omitempty" bson:"password,omitempty"`
	Location string  `json:"location,omitempty" bson:"location,omitempty"`
	Phone    string  `json:"phone,omitempty" bson:"phone,omitempty"`
	Username string  `json:"username,omitempty" bson:"username,omitempty"`
	Dogs     []Dogs  `json:"dogs,omitempty" bson:"dogs,omitempty"`
	Cats     []Cats  `json:"cats,omitempty" bson:"cats,omitempty"`
	Birds    []Birds `json:"birds,omitempty" bson:"birds,omitempty"`
	Other    []Other `json:"other,omitempty" bson:"other,omitempty"`
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

	fmt.Println(token, "tokenn33")
	fmt.Println(tokenString, "tokenString")

	return tokenString, nil
}

func ParseToken(tokenString string) (*Claims, error) {
	// JWT'nin içeriğini ayrıştır
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

	// Token'ı ayrıştırırken belirtilen Claims yapısına dönüştür
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

type Dogs struct {
	ID        string    `json:"id,omitempty" bson:"_id,omitempty"`
	Email     string    `json:"email,omitempty" bson:"email,omitempty"`
	Name      string    `json:"password,omitempty" bson:"password,omitempty"`
	Age       int       `json:"age,omitempty" bson:"age,omitempty"`
	Type      string    `json:"type,omitempty" bson:"type,omitempty"`
	CreatedAt time.Time `json:"createdAt,omitempty" bson:"createdAt,omitempty"`
	Location  string    `json:"location,omitempty" bson:"location,omitempty"`
}

type Cats struct {
	ID        string    `json:"id,omitempty" bson:"_id,omitempty"`
	Email     string    `json:"email,omitempty" bson:"email,omitempty"`
	Name      string    `json:"password,omitempty" bson:"password,omitempty"`
	Age       int       `json:"age,omitempty" bson:"age,omitempty"`
	Type      string    `json:"type,omitempty" bson:"type,omitempty"`
	CreatedAt time.Time `json:"createdAt,omitempty" bson:"createdAt,omitempty"`
	Location  string    `json:"location,omitempty" bson:"location,omitempty"`
}

type Birds struct {
	ID        string    `json:"id,omitempty" bson:"_id,omitempty"`
	Email     string    `json:"email,omitempty" bson:"email,omitempty"`
	Name      string    `json:"password,omitempty" bson:"password,omitempty"`
	Age       int       `json:"age,omitempty" bson:"age,omitempty"`
	Type      string    `json:"type,omitempty" bson:"type,omitempty"`
	CreatedAt time.Time `json:"createdAt,omitempty" bson:"createdAt,omitempty"`
	Location  string    `json:"location,omitempty" bson:"location,omitempty"`
}

type Other struct {
	ID        string    `json:"id,omitempty" bson:"_id,omitempty"`
	Email     string    `json:"email,omitempty" bson:"email,omitempty"`
	Name      string    `json:"password,omitempty" bson:"password,omitempty"`
	Age       int       `json:"age,omitempty" bson:"age,omitempty"`
	Type      string    `json:"type,omitempty" bson:"type,omitempty"`
	CreatedAt time.Time `json:"createdAt,omitempty" bson:"createdAt,omitempty"`
	Location  string    `json:"location,omitempty" bson:"location,omitempty"`
}

type Image struct {
	URL  string `json:"url,omitempty" bson:"url,omitempty"`
	Type string `json:"type,omitempty" bson:"type,omitempty"`
}

func CreateDog(c *fiber.Ctx) error {
	dog := new(Dogs)
	if err := c.BodyParser(dog); err != nil {
		return err
	}
	_, err := dogCollection.InsertOne(context.Background(), dog)
	if err != nil {
		return err
	}
	return c.JSON(dog)
}

// Kedi ekleme işlevi
func CreateCat(c *fiber.Ctx) error {
	cat := new(Cats)
	if err := c.BodyParser(cat); err != nil {
		return err
	}
	_, err := catCollection.InsertOne(context.Background(), cat)
	if err != nil {
		return err
	}
	return c.JSON(cat)
}

// Kuş ekleme işlevi
func CreateBird(c *fiber.Ctx) error {
	bird := new(Birds)
	if err := c.BodyParser(bird); err != nil {
		return err
	}
	_, err := birdCollection.InsertOne(context.Background(), bird)
	if err != nil {
		return err
	}
	return c.JSON(bird)
}

// Diğer hayvan ekleme işlevi
func CreateOther(c *fiber.Ctx) error {
	other := new(Other)
	if err := c.BodyParser(other); err != nil {
		return err
	}
	_, err := otherCollection.InsertOne(context.Background(), other)
	if err != nil {
		return err
	}
	return c.JSON(other)
}

// Kullanıcıların tüm köpeklerini getiren işlev
func GetDogs(c *fiber.Ctx) error {
	var dogs []Dogs
	cursor, err := dogCollection.Find(context.Background(), bson.M{})
	if err != nil {
		return err
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var dog Dogs
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

// Kullanıcıların tüm kedilerini getiren işlev
func GetCats(c *fiber.Ctx) error {
	var cats []Cats
	cursor, err := catCollection.Find(context.Background(), bson.M{})
	if err != nil {
		return err
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var cat Cats
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

// Kullanıcıların tüm kuşlarını getiren işlev
func GetBirds(c *fiber.Ctx) error {
	var birds []Birds
	cursor, err := birdCollection.Find(context.Background(), bson.M{})
	if err != nil {
		return err
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var bird Birds
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

// Kullanıcıların tüm diğer hayvanlarını getiren işlev
func GetOthers(c *fiber.Ctx) error {
	var others []Other
	cursor, err := otherCollection.Find(context.Background(), bson.M{})
	if err != nil {
		return err
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var other Other
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

func GetDogsByEmail(c *fiber.Ctx) error {
	// Talep edilen e-posta adresini al
	email := c.Params("email")

	// E-posta adresine göre köpekleri bul
	filter := bson.M{"email": email}
	cursor, err := dogCollection.Find(context.Background(), filter)
	if err != nil {
		// Hata durumunda geri dön
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch dogs",
		})
	}
	defer cursor.Close(context.Background())

	// Köpekleri bir diziye ekleyerek döndür
	var dogs []Dogs
	if err := cursor.All(context.Background(), &dogs); err != nil {
		// Hata durumunda geri dön
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch dogs",
		})
	}

	// Köpekleri JSON formatında döndür
	return c.JSON(dogs)
}

func PetEndpoints(app *fiber.App) {

	app.Post("/dog/add", CreateDog)
	app.Get("/dog", GetDogs) // Tüm köpekleri getir
	app.Get("/dog/:email", GetDogsByEmail)

	app.Post("/cat/add", CreateCat)
	app.Get("/cat", GetCats) // Tüm kedileri getir

	app.Post("/bird/add", CreateBird)
	app.Get("/bird", GetBirds) // Tüm kuşları getir

	app.Post("/other/add", CreateOther)
	app.Get("/other", GetOthers) // Tüm diğer hayvanları getir

}
