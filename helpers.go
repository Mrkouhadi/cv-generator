package main

import (
	"context"
	"encoding/base64"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// save an image file to "./data/images"
func SaveImage(data string, filename string) (string, error) {
	// Remove data:image/png;base64, from the data
	b64data := data[strings.IndexByte(data, ',')+1:]

	// Decode the base64-encoded image data
	decoded, err := base64.StdEncoding.DecodeString(b64data)
	if err != nil {
		return "", fmt.Errorf("error decoding image data: %v", err)
	}

	// Check if the image size is within the allowed limit (1024 MB)
	if len(decoded) > 1024*1024*1024 {
		return "", fmt.Errorf("image size exceeds the allowed limit")
	}

	// Extract the image extension from the base64 data
	ext := ""
	if strings.HasPrefix(data, "data:image/jpeg") {
		ext = ".jpeg"
	} else if strings.HasPrefix(data, "data:image/jpg") {
		ext = ".jpg"
	} else if strings.HasPrefix(data, "data:image/png") {
		ext = ".png"
	} else {
		return "", fmt.Errorf("unsupported image format")
	}

	// Construct the filename with the extracted extension
	filenameWithExt := filename + ext

	// Define the directory where the image will be saved
	dir := "./data/images"

	// Ensure the directory exists
	err = os.MkdirAll(dir, 0755)
	if err != nil {
		return "", fmt.Errorf("error creating directory: %v", err)
	}

	// Define the file path
	filePath := filepath.Join(dir, filenameWithExt)

	// Write the decoded image data to a file
	err = os.WriteFile(filePath, decoded, 0644)
	if err != nil {
		return "", fmt.Errorf("error writing image to file: %v", err)
	}

	// Return the path of the saved image
	return filePath, nil
}

// save a pdf file
func SavePDFFile(ctx context.Context, title string, defaultFilename string, _ string, _ string, base64Content string) string {

	file, err := runtime.SaveFileDialog(ctx, runtime.SaveDialogOptions{
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

func SavePngFile(ctx context.Context, title string, defaultFilename string, _ string, _ string, base64Content string) string {
	file, err := runtime.SaveFileDialog(ctx, runtime.SaveDialogOptions{
		Title:           title,
		DefaultFilename: defaultFilename,
		Filters: []runtime.FileFilter{
			{
				DisplayName: "Image Files (*.png)",
				Pattern:     "*.png",
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
	b64data := base64Content[strings.IndexByte(base64Content, ',')+1:]

	// Decode the base64 content
	decodedContent, err := base64.StdEncoding.DecodeString(b64data)
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
