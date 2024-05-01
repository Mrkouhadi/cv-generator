package main

import (
	"context"
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/wailsapp/wails/v2/pkg/runtime"
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
		// FIXME: handle errors properly
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
	_ = a.SaveFile(name, "cv-builder-"+name+".pdf", "", "", requestData.PdfData)
}

func (a *App) SaveFile(title string, defaultFilename string, _ string, _ string, base64Content string) string {

	file, err := runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{
		Title:           title,
		DefaultFilename: defaultFilename,
		Filters: []runtime.FileFilter{
			{
				DisplayName: "Pdf Files (*.pdf)",
				Pattern:     "*.pdf",
			},
		},
		ShowHiddenFiles:            true,
		CanCreateDirectories:       true,
		TreatPackagesAsDirectories: true,
	})
	if err != nil {
		fmt.Println("User Cancelled the File Dialog.", err)
		return ""
	}

	// Decode the base64 content
	decodedContent, err := base64.StdEncoding.DecodeString(base64Content)
	if err != nil {
		fmt.Println("Error decoding base64 content:", err)
		return ""
	}

	// Write the decoded content to the selected file
	err = os.WriteFile(file, decodedContent, 0644)
	if err != nil {
		fmt.Println("Error writing file:", err)
		return ""
	}
	return file // returns complete path of the saved file
}
