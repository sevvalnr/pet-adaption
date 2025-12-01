package models

import (
	"time"

	"github.com/dgrijalva/jwt-go"
)

type User struct {
	ID       string  `json:"id,omitempty" bson:"_id,omitempty"`
	UserID   string  `json:"user_id,omitempty" bson:"user_id,omitempty"`
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

type Dogs struct {
	ID          string    `json:"id,omitempty" bson:"_id,omitempty"`
	PetID       string    `json:"petId,omitempty" bson:"petId,omitempty"`
	UserID      string    `json:"user_id,omitempty" bson:"user_id,omitempty"`
	Email       string    `json:"email,omitempty" bson:"email,omitempty"`
	Name        string    `json:"name,omitempty" bson:"name,omitempty"`
	Age         string    `json:"age,omitempty" bson:"age,omitempty"`
	Type        string    `json:"type,omitempty" bson:"type,omitempty"`
	CreatedAt   time.Time `json:"createdAt,omitempty" bson:"createdAt,omitempty"`
	Location    string    `json:"location,omitempty" bson:"location,omitempty"`
	Description string    `json:"description,omitempty" bson:"description,omitempty"`
	Image       []Image   `json:"image,omitempty" bson:"image,omitempty"`
}

type Cats struct {
	ID        string    `json:"id,omitempty" bson:"_id,omitempty"`
	PetID     string    `json:"petId,omitempty" bson:"petId,omitempty"`
	UserID    string    `json:"user_id,omitempty" bson:"user_id,omitempty"`
	Email     string    `json:"email,omitempty" bson:"email,omitempty"`
	Name      string    `json:"name,omitempty" bson:"name,omitempty"`
	Age       int       `json:"age,omitempty" bson:"age,omitempty"`
	Type      string    `json:"type,omitempty" bson:"type,omitempty"`
	CreatedAt time.Time `json:"createdAt,omitempty" bson:"createdAt,omitempty"`
	Location  string    `json:"location,omitempty" bson:"location,omitempty"`
	Image     []Image   `json:"image,omitempty" bson:"image,omitempty"`
}

type Birds struct {
	ID        string    `json:"id,omitempty" bson:"_id,omitempty"`
	PetID     string    `json:"petId,omitempty" bson:"petId,omitempty"`
	UserID    string    `json:"user_id,omitempty" bson:"user_id,omitempty"`
	Email     string    `json:"email,omitempty" bson:"email,omitempty"`
	Name      string    `json:"name,omitempty" bson:"name,omitempty"`
	Age       int       `json:"age,omitempty" bson:"age,omitempty"`
	Type      string    `json:"type,omitempty" bson:"type,omitempty"`
	CreatedAt time.Time `json:"createdAt,omitempty" bson:"createdAt,omitempty"`
	Location  string    `json:"location,omitempty" bson:"location,omitempty"`
	Image     []Image   `json:"image,omitempty" bson:"image,omitempty"`
}

type Other struct {
	ID        string    `json:"id,omitempty" bson:"_id,omitempty"`
	PetID     string    `json:"petId,omitempty" bson:"petId,omitempty"`
	UserID    string    `json:"user_id,omitempty" bson:"user_id,omitempty"`
	Email     string    `json:"email,omitempty" bson:"email,omitempty"`
	Name      string    `json:"name,omitempty" bson:"name,omitempty"`
	Age       int       `json:"age,omitempty" bson:"age,omitempty"`
	Type      string    `json:"type,omitempty" bson:"type,omitempty"`
	CreatedAt time.Time `json:"createdAt,omitempty" bson:"createdAt,omitempty"`
	Location  string    `json:"location,omitempty" bson:"location,omitempty"`
	Image     []Image   `json:"image,omitempty" bson:"image,omitempty"`
}

type Image struct {
	URL  string `json:"url,omitempty" bson:"url,omitempty"`
	Type string `json:"type,omitempty" bson:"type,omitempty"`
}
type Claims struct {
	UserID string `json:"user_id"`
	jwt.StandardClaims
}
