package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"os"
)

// App struct
type App struct {
	ctx context.Context
	Db  *sql.DB
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	db, err := InitializeSqlite()
	if err != nil {
		log.Println("cannot set up sqlite database !")
	}
	a.Db = db
	log.Println("successfully set up the db")
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// //PDF
// /////Receive the file from the clientside then save it according to the user's preference.
type RequestData struct {
	PdfData string `json:"pdfData"`
}

func (a *App) SendPdfFile(file, name string) {
	var requestData RequestData
	err := json.Unmarshal([]byte(file), &requestData)
	if err != nil {
		fmt.Println("Error unmarshalling JSON:", err)
		return
	}
	_ = SavePDFFile(a.ctx, name, "cv-generator-"+name+".pdf", "", "", requestData.PdfData)
}

// ///////
type RequestImgData struct {
	ImageData string `json:"imageData"`
}

func (a *App) SendPngFile(file string) {
	var requestData RequestImgData
	err := json.Unmarshal([]byte(file), &requestData)
	if err != nil {
		fmt.Println("Error unmarshalling JSON:", err)
		return
	}
	_ = SavePngFile(a.ctx, "cv-generator", "cv-generator"+".png", "", "", requestData.ImageData)
}

// ///////////////////
func (a *App) GetImage(filename string) []byte {
	data, err := os.ReadFile("./data/images/" + filename)
	if err != nil {
		log.Println("Error reading file:", err)
		return nil
	}
	return data
}
