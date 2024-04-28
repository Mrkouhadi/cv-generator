package main

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"os"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// ///// save pdf file in "./data/files"
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
	// Decode base64 PDF data
	pdfData, err := base64.StdEncoding.DecodeString(requestData.PdfData)
	if err != nil {
		fmt.Println("Error decoding PDF data:", err)
		return
	}
	// Save the PDF file to the server
	err = os.WriteFile("./data/files/"+name+".pdf", pdfData, 0644)
	if err != nil {
		fmt.Println("Error writing PDF file:", err)
		return
	}
	fmt.Println("PDF file saved successfully")
}
