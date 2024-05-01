package main

import (
	"database/sql"
	"fmt"

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
			id INTEGER PRIMARY KEY,
			name TEXT,
			email TEXT,
			photo TEXT,
			birthdate TIMESTAMP,
			telephone TEXT,
			address TEXT,
			nationality TEXT,
			job_title TEXT,
			description TEXT
		)`,
		`CREATE TABLE IF NOT EXISTS educations (
			id INTEGER PRIMARY KEY,
			user_id INTEGER,
			degree TEXT,
			major TEXT,
			university TEXT,
			country TEXT,
			city TEXT,
			start_date TIMESTAMP,
			end_date TIMESTAMP,
			FOREIGN KEY(user_id) REFERENCES users(id)
		)`,
		`CREATE TABLE IF NOT EXISTS experiences (
			id INTEGER PRIMARY KEY,
			user_id INTEGER,
			field TEXT,
			job_title TEXT,
			company TEXT,
			country TEXT,
			city TEXT,
			description TEXT,
			start_date TIMESTAMP,
			end_date TIMESTAMP,
			FOREIGN KEY(user_id) REFERENCES users(id)
		)`,
		`CREATE TABLE IF NOT EXISTS skills (
			id INTEGER PRIMARY KEY,
			user_id INTEGER,
			type TEXT,
			title TEXT,
			proficiency TEXT,
			FOREIGN KEY(user_id) REFERENCES users(id)
		)`,
		`CREATE TABLE IF NOT EXISTS languages (
			id INTEGER PRIMARY KEY,
			user_id INTEGER,
			language TEXT,
			proficiency TEXT,
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
func (app *App) AddUser(user User) error {
	// Prepare SQL statement for inserting user
	stmt, err := app.Db.Prepare(`INSERT INTO users
		(name, email, photo, birthdate, telephone, address, nationality, job_title, description)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
	if err != nil {
		return err
	}
	defer stmt.Close()
	// Execute SQL statement with user data
	_, err = stmt.Exec(user.Name, user.Email, user.Photo, user.Birthdate, user.Telephone, user.Address, user.Nationality, user.JobTitle, user.Description)
	if err != nil {
		return err
	}
	return nil
}
func (app *App) AddEducation(education Education) error {
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

func (app *App) AddExperience(experience Experience) error {
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

func (app *App) AddSkill(skill Skill) error {
	stmt, err := app.Db.Prepare(`INSERT INTO skill 
		(user_id, type, title, proficiency)
		VALUES (?, ?, ?, ?)`)
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(skill.UserID, skill.Type, skill.Title, skill.Proficiency)
	if err != nil {
		return err
	}

	return nil
}

func (app *App) AddLanguage(language Language) error {
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
func (app *App) UpdateUser(db *sql.DB, user User) error {
	stmt, err := app.Db.Prepare(`UPDATE users 
		SET name=?, email=?, photo=?, birthdate=?, telephone=?, address=?, nationality=?, job_title=?, description=?
		WHERE id=?`)
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(user.Name, user.Email, user.Photo, user.Birthdate, user.Telephone, user.Address, user.Nationality, user.JobTitle, user.Description, user.ID)
	if err != nil {
		return err
	}
	return nil
}

func (app *App) UpdateEducation(education Education) error {
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

func (app *App) UpdateExperience(experience Experience) error {
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

func (app *App) UpdateSkill(skill Skill) error {
	stmt, err := app.Db.Prepare(`UPDATE skill 
		SET type=?, title=?, proficiency=?
		WHERE id=?`)
	if err != nil {
		return err
	}
	defer stmt.Close()
	_, err = stmt.Exec(skill.Type, skill.Title, skill.Proficiency, skill.ID)
	if err != nil {
		return err
	}
	return nil
}

func (app *App) UpdateLanguage(language Language) error {
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
// *********************************Get All Items from the Database**:
// - Retrieve all rows from the table using a `SELECT` query:
func (app *App) GetAllUsers() ([]User, error) {
	rows, err := app.Db.Query("SELECT * FROM users")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []User
	for rows.Next() {
		var user User
		err := rows.Scan(&user.ID, &user.Name, &user.Email, &user.Photo, &user.Birthdate, &user.Telephone, &user.Address, &user.Nationality, &user.JobTitle, &user.Description)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return users, nil
}
func (app *App) GetAllEducation() ([]Education, error) {
	rows, err := app.Db.Query("SELECT * FROM education")
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
func (app *App) GetAllExperience() ([]Experience, error) {
	rows, err := app.Db.Query("SELECT * FROM experience")
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
func (app *App) GetAllSkills() ([]Skill, error) {
	rows, err := app.Db.Query("SELECT * FROM skill")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var skills []Skill
	for rows.Next() {
		var skill Skill
		err := rows.Scan(&skill.ID, &skill.UserID, &skill.Type, &skill.Title, &skill.Proficiency)
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
func (app *App) GetAllLanguages() ([]Language, error) {
	rows, err := app.Db.Query("SELECT * FROM language")
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
		Scan(&skill.ID, &skill.UserID, &skill.Type, &skill.Title, &skill.Proficiency)
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
func (app *App) DeleteUserByID(userID int) error {
	_, err := app.Db.Exec("DELETE FROM users WHERE id = ?", userID)
	if err != nil {
		return err
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
func (app *App) DeleteAllEducation() error {
	_, err := app.Db.Exec("DELETE FROM education")
	if err != nil {
		return err
	}
	return nil
}
func (app *App) DeleteAllExperience() error {
	_, err := app.Db.Exec("DELETE FROM experience")
	if err != nil {
		return err
	}
	return nil
}
func (app *App) DeleteAllSkill() error {
	_, err := app.Db.Exec("DELETE FROM skill")
	if err != nil {
		return err
	}
	return nil
}
func (app *App) DeleteAllLanguage() error {
	_, err := app.Db.Exec("DELETE FROM language")
	if err != nil {
		return err
	}
	return nil
}
