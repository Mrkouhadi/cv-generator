package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
	"time"

	_ "github.com/mattn/go-sqlite3"
)

// 1- set up sqlite database connectiona dn create necessary tables.
func InitializeSqlite() (*sql.DB, error) {
	// Connect to the SQLite database
	db, err := sql.Open("sqlite3", "cvbuilder_db.db")
	if err != nil {
		return nil, err
	}
	// Create tables if they don't exist
	queries := []string{
		`CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			email TEXT NOT NULL,
			photo TEXT NOT NULL,
			birthdate TIMESTAMP NOT NULL,
			telephone TEXT NOT NULL,
			address TEXT NOT NULL,
			nationality TEXT NOT NULL,
			job_title TEXT NOT NULL,
			description TEXT NOT NULL
		)`,
		`CREATE TABLE IF NOT EXISTS education (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			user_id INTEGER NOT NULL,
			degree TEXT NOT NULL,
			major TEXT NOT NULL,
			university TEXT NOT NULL,
			country TEXT NOT NULL,
			city TEXT NOT NULL,
			start_date TIMESTAMP NOT NULL,
			end_date TIMESTAMP NOT NULL,
			FOREIGN KEY(user_id) REFERENCES users(id)
		)`,
		`CREATE TABLE IF NOT EXISTS experience (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			user_id INTEGER NOT NULL,
			field TEXT NOT NULL,
			job_title TEXT NOT NULL,
			company TEXT NOT NULL,
			country TEXT NOT NULL,
			city TEXT NOT NULL,
			description TEXT NOT NULL,
			start_date TIMESTAMP NOT NULL,
			end_date TIMESTAMP NOT NULL,
			FOREIGN KEY(user_id) REFERENCES users(id)
		)`,
		`CREATE TABLE IF NOT EXISTS skill (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			user_id INTEGER NOT NULL,
			title TEXT NOT NULL,
			proficiency TEXT NOT NULL,
			FOREIGN KEY(user_id) REFERENCES users(id)
		)`,
		`CREATE TABLE IF NOT EXISTS language (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			user_id INTEGER NOT NULL,
			language TEXT NOT NULL,
			proficiency TEXT NOT NULL,
			FOREIGN KEY(user_id) REFERENCES users(id)
		)`,
	}
	// Execute queries to create tables
	for _, query := range queries {
		_, err := db.Exec(query)
		if err != nil {
			return nil, err
		}
	}
	return db, nil
}

// 2. ****************************************************
// *******************************Insert Data into the Database**:
func (app *App) AddUser(data string) error {
	var user User
	err := json.Unmarshal([]byte(data), &user)
	if err != nil {
		fmt.Println("Error unmarshalling JSON:", err)
		return nil
	}
	// saving the new image file and getting back the path to store it in the database
	d := time.Now()
	dateString := d.Format("2006-01-02 15:04:05") // Format: YYYY-MM-DD
	imgPath, err := SaveImage(user.Photo, "img-"+strconv.Itoa(user.ID)+strings.ReplaceAll(dateString, " ", ""))
	if err != nil {
		fmt.Println("Error saving the image: ", err)
		return err
	}
	// Prepare SQL statement for inserting user
	stmt, err := app.Db.Prepare(`INSERT INTO users
		(name, email, photo, birthdate, telephone, address, nationality, job_title, description)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
	if err != nil {
		return err
	}
	defer stmt.Close()
	// Execute SQL statement with user data
	_, err = stmt.Exec(user.Name, user.Email, imgPath, user.Birthdate, user.Telephone, user.Address, user.Nationality, user.JobTitle, user.Description)
	if err != nil {
		return err
	}
	return nil
}

func (app *App) AddEducation(data string) error {
	var education Education
	err := json.Unmarshal([]byte(data), &education)
	if err != nil {
		fmt.Println("Error unmarshalling JSON:", err)
		return nil
	}
	stmt, err := app.Db.Prepare(`INSERT INTO education 
		(user_id, degree, major, university, country, city, start_date, end_date)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(education.UserID, education.Degree, education.Major, education.University, education.Country, education.City, education.StartDate, education.EndDate)
	if err != nil {
		return err
	}
	return nil
}

func (app *App) AddExperience(data string) error {
	var experience Experience
	err := json.Unmarshal([]byte(data), &experience)
	if err != nil {
		fmt.Println("Error unmarshalling JSON:", err)
		return nil
	}
	stmt, err := app.Db.Prepare(`INSERT INTO experience 
		(user_id, field, job_title, company, country, city, description, start_date, end_date)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(experience.UserID, experience.Field, experience.JobTitle, experience.Company, experience.Country, experience.City, experience.Description, experience.StartDate, experience.EndDate)
	if err != nil {
		return err
	}

	return nil
}

func (app *App) AddSkill(data string) error {
	var skill Skill
	err := json.Unmarshal([]byte(data), &skill)
	if err != nil {
		fmt.Println("Error unmarshalling JSON:", err)
		return nil
	}
	stmt, err := app.Db.Prepare(`INSERT INTO skill 
		(user_id, title, proficiency)
		VALUES (?, ?, ?)`)
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(skill.UserID, skill.Title, skill.Proficiency)
	if err != nil {
		return err
	}

	return nil
}

func (app *App) AddLanguage(data string) error {
	var language Language
	err := json.Unmarshal([]byte(data), &language)
	if err != nil {
		fmt.Println("Error unmarshalling JSON:", err)
		return nil
	}
	stmt, err := app.Db.Prepare(`INSERT INTO language 
		(user_id, language, proficiency)
		VALUES (?, ?, ?)`)
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(language.UserID, language.Language, language.Proficiency)
	if err != nil {
		return err
	}

	return nil
}

// 3. ****************************************************
// *********************************Update Data in the Database**:
func (app *App) UpdateUser(data string) error {
	var user User
	err := json.Unmarshal([]byte(data), &user)
	if err != nil {
		fmt.Println("Error unmarshalling JSON:", err)
		return nil
	}
	fmt.Println(user)
	// saving the new image file and getting back the path to store it in the database
	d := time.Now()
	dateString := d.Format("2006-01-02 15:04:05") // Format: YYYY-MM-DD
	imgPath, err := SaveImage(user.Photo, "img-"+strconv.Itoa(user.ID)+strings.ReplaceAll(dateString, " ", ""))
	if err != nil {
		fmt.Println("Error saving the image: ", err)
		return err
	}

	stmt, err := app.Db.Prepare(`UPDATE users 
		SET name=?, email=?, photo=?, birthdate=?, telephone=?, address=?, nationality=?, job_title=?, description=?
		WHERE id=?`)
	if err != nil {
		return err
	}
	defer stmt.Close()
	_, err = stmt.Exec(user.Name, user.Email, imgPath, user.Birthdate, user.Telephone, user.Address, user.Nationality, user.JobTitle, user.Description, user.ID)
	if err != nil {
		return err
	}
	return nil
}

func (app *App) UpdateEducation(data string) error {
	var education Education
	err := json.Unmarshal([]byte(data), &education)
	if err != nil {
		fmt.Println("Error unmarshalling JSON:", err)
		return nil
	}
	stmt, err := app.Db.Prepare(`UPDATE education 
		SET degree=?, major=?, university=?, country=?, city=?, start_date=?, end_date=?
		WHERE id=?`)
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(education.Degree, education.Major, education.University, education.Country, education.City, education.StartDate, education.EndDate, education.ID)
	if err != nil {
		return err
	}

	return nil
}

func (app *App) UpdateExperience(data string) error {
	var experience Experience
	err := json.Unmarshal([]byte(data), &experience)
	if err != nil {
		fmt.Println("Error unmarshalling JSON:", err)
		return nil
	}
	stmt, err := app.Db.Prepare(`UPDATE experience 
		SET field=?, job_title=?, company=?, country=?, city=?, description=?, start_date=?, end_date=?
		WHERE id=?`)
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(experience.Field, experience.JobTitle, experience.Company, experience.Country, experience.City, experience.Description, experience.StartDate, experience.EndDate, experience.ID)
	if err != nil {
		return err
	}

	return nil
}

func (app *App) UpdateSkill(data string) error {
	var skill Skill
	err := json.Unmarshal([]byte(data), &skill)
	if err != nil {
		fmt.Println("Error unmarshalling JSON:", err)
		return nil
	}
	stmt, err := app.Db.Prepare(`UPDATE skill 
		SET title=?, proficiency=?
		WHERE id=?`)
	if err != nil {
		return err
	}
	defer stmt.Close()
	_, err = stmt.Exec(skill.Title, skill.Proficiency, skill.ID)
	if err != nil {
		return err
	}
	return nil
}

func (app *App) UpdateLanguage(data string) error {
	var language Language
	err := json.Unmarshal([]byte(data), &language)
	if err != nil {
		fmt.Println("Error unmarshalling JSON:", err)
		return nil
	}
	stmt, err := app.Db.Prepare(`UPDATE language 
		SET language=?, proficiency=?
		WHERE id=?`)
	if err != nil {
		return err
	}
	defer stmt.Close()
	_, err = stmt.Exec(language.Language, language.Proficiency, language.ID)
	if err != nil {
		return err
	}
	return nil
}

// 4. **. ****************************************************
// *********************************Get All Items of a specific user
func (app *App) GetAllUsers() []User {
	rows, err := app.Db.Query("SELECT * FROM users")
	if err != nil {
		return nil
	}
	defer rows.Close()
	var users []User
	for rows.Next() {
		var user User
		err := rows.Scan(&user.ID, &user.Name, &user.Email, &user.Photo, &user.Birthdate, &user.Telephone, &user.Address, &user.Nationality, &user.JobTitle, &user.Description)
		if err != nil {
			return nil
		}
		users = append(users, user)
	}
	if err := rows.Err(); err != nil {
		return nil
	}
	return users
}

func (app *App) GetAllEducation(userID int) ([]Education, error) {
	// Prepare the SQL query with a WHERE clause to filter by userID
	query := "SELECT * FROM education WHERE user_id = ?"
	// Execute the query with the provided userID
	rows, err := app.Db.Query(query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var educations []Education
	for rows.Next() {
		var education Education
		err := rows.Scan(&education.ID, &education.UserID, &education.Degree, &education.Major, &education.University, &education.Country, &education.City, &education.StartDate, &education.EndDate)
		if err != nil {
			return nil, err
		}
		educations = append(educations, education)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return educations, nil
}
func (app *App) GetAllExperience(userID int) ([]Experience, error) {
	query := "SELECT * FROM experience WHERE user_id = ?"
	rows, err := app.Db.Query(query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var experiences []Experience
	for rows.Next() {
		var experience Experience
		err := rows.Scan(&experience.ID, &experience.UserID, &experience.Field, &experience.JobTitle, &experience.Company, &experience.Country, &experience.City, &experience.Description, &experience.StartDate, &experience.EndDate)
		if err != nil {
			return nil, err
		}
		experiences = append(experiences, experience)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return experiences, nil
}

func (app *App) GetAllSkills(userID int) ([]Skill, error) {
	query := "SELECT * FROM skill WHERE user_id = ?"
	rows, err := app.Db.Query(query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var skills []Skill
	for rows.Next() {
		var skill Skill
		err := rows.Scan(&skill.ID, &skill.UserID, &skill.Title, &skill.Proficiency)
		if err != nil {
			return nil, err
		}
		skills = append(skills, skill)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return skills, nil
}

func (app *App) GetAllLanguages(userID int) ([]Language, error) {
	query := "SELECT * FROM language WHERE user_id = ?"
	rows, err := app.Db.Query(query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var languages []Language
	for rows.Next() {
		var language Language
		err := rows.Scan(&language.ID, &language.UserID, &language.Language, &language.Proficiency)
		if err != nil {
			return nil, err
		}
		languages = append(languages, language)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return languages, nil
}

// 5. **. ****************************************************
// *********************************Get a Single Item from the Database**:
func (app *App) GetUserByID(userID int) (*User, error) {
	var user User
	err := app.Db.QueryRow("SELECT * FROM users WHERE id = ?", userID).
		Scan(&user.ID, &user.Name, &user.Email, &user.Photo, &user.Birthdate, &user.Telephone, &user.Address, &user.Nationality, &user.JobTitle, &user.Description)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("user with ID %d not found", userID)
		}
		return nil, err
	}
	return &user, nil
}
func (app *App) GetEducationByID(educationID int) (*Education, error) {
	var education Education
	err := app.Db.QueryRow("SELECT * FROM education WHERE id = ?", educationID).
		Scan(&education.ID, &education.UserID, &education.Degree, &education.Major, &education.University, &education.Country, &education.City, &education.StartDate, &education.EndDate)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("education record with ID %d not found", educationID)
		}
		return nil, err
	}
	return &education, nil
}
func (app *App) GetExperienceByID(experienceID int) (*Experience, error) {
	var experience Experience
	err := app.Db.QueryRow("SELECT * FROM experience WHERE id = ?", experienceID).
		Scan(&experience.ID, &experience.UserID, &experience.Field, &experience.JobTitle, &experience.Company, &experience.Country, &experience.City, &experience.Description, &experience.StartDate, &experience.EndDate)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("experience record with ID %d not found", experienceID)
		}
		return nil, err
	}
	return &experience, nil
}
func (app *App) GetSkillByID(skillID int) (*Skill, error) {
	var skill Skill
	err := app.Db.QueryRow("SELECT * FROM skill WHERE id = ?", skillID).
		Scan(&skill.ID, &skill.UserID, &skill.Title, &skill.Proficiency)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("skill record with ID %d not found", skillID)
		}
		return nil, err
	}
	return &skill, nil
}
func (app *App) GetLanguageByID(languageID int) (*Language, error) {
	var language Language
	err := app.Db.QueryRow("SELECT * FROM language WHERE id = ?", languageID).
		Scan(&language.ID, &language.UserID, &language.Language, &language.Proficiency)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("language record with ID %d not found", languageID)
		}
		return nil, err
	}
	return &language, nil
}

// 6. **. ****************************************************
// *********************************Delete an Item from the Database**:
//   - Execute a `DELETE` query to remove a specific row:
func (app *App) DeleteUserByID(userID int, filename string) error {

	_, err := app.Db.Exec("DELETE FROM users WHERE id = ?", userID)
	if err != nil {
		return err
	}
	// delete the image as well
	err = os.Remove(filename)
	if err != nil {
		log.Println("user deleted but the profile photo could not be removed. Please do it manually by going to ./data/images directory")
	}
	// remove all his/her data(education,experience,skills,languages)
	err = app.DeleteAllRowsByUserID(userID)
	if err != nil {
		log.Println("could not delete data of the deleted user!")
	}
	return nil
}
func (app *App) DeleteEducationByID(educationID int) error {
	_, err := app.Db.Exec("DELETE FROM education WHERE id = ?", educationID)
	if err != nil {
		return err
	}
	return nil
}
func (app *App) DeleteExperienceByID(experienceID int) error {
	_, err := app.Db.Exec("DELETE FROM experience WHERE id = ?", experienceID)
	if err != nil {
		return err
	}
	return nil
}
func (app *App) DeleteSkillByID(skillID int) error {
	_, err := app.Db.Exec("DELETE FROM skill WHERE id = ?", skillID)
	if err != nil {
		return err
	}
	log.Printf("skill %d has been deleted", skillID)
	return nil
}
func (app *App) DeleteLanguageByID(languageID int) error {
	_, err := app.Db.Exec("DELETE FROM language WHERE id = ?", languageID)
	if err != nil {
		return err
	}
	return nil
}

// 7. **. ****************************************************
// *********************************Delete All Items in a Database**:
//   - To delete all rows from a table, use:
func (app *App) DeleteAllUsers() error {
	_, err := app.Db.Exec("DELETE FROM users")
	if err != nil {
		return err
	}
	return nil
}

// delete all data of a user;
func (app *App) DeleteAllRowsByUserID(userID int) error {
	// Start a transaction
	tx, err := app.Db.Begin()
	if err != nil {
		return err
	}
	defer func() {
		if err != nil {
			// Rollback the transaction if an error occurred
			tx.Rollback()
			return
		}
		// Commit the transaction if no error occurred
		err = tx.Commit()
	}()

	// Execute the combined DELETE query
	_, err = tx.Exec(`
        DELETE FROM education WHERE user_id = ?;
        DELETE FROM experience WHERE user_id = ?;
        DELETE FROM skill WHERE user_id = ?;
        DELETE FROM language WHERE user_id = ?;
    `, userID, userID, userID, userID)
	if err != nil {
		return err
	}
	return nil
}
