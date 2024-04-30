// 1. **Create a Database**:
// - First, ensure you have SQLite installed. If not, follow the installation instructions for your operating system.
// - Next, use the `modernc.org/sqlite` package to connect to an SQLite database. Import it in your Go code.
// - Create a new database file using the following snippet:

package main

import (
	"database/sql"

	_ "modernc.org/sqlite"
)

type Database struct {
	Db *sql.DB
}

func StartSqlite() {
	cvbuilder_db := Database{}
	db, err := sql.Open("sqlite", "cvbuilder_db.db") // create a new db named cvbuilder_db
	if err != nil {
		panic(err)
	}
	defer db.Close()
	cvbuilder_db.Db = db
}

// 2. **Insert Data into the Database**:
// - To insert data, create a table and execute an `INSERT INTO` query. Here's an example:
func (DB *Database) Insert(query string) {
	_, err := DB.Db.Exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)")
	if err != nil {
		panic(err)
	}
	_, err = DB.Db.Exec(query) // query: "INSERT INTO users (name) VALUES (?)", "Alice"
	if err != nil {
		panic(err)
	}
}

// 3. **Update Data in the Database**:
// - To update data, execute an `UPDATE` query. For instance:
func (DB *Database) Update() {
	_, err := DB.Db.Exec("UPDATE users SET name = ? WHERE id = ?", "Bob", 1)
	if err != nil {
		panic(err)
	}
}

// 4. **Get All Items from the Database**:
// - Retrieve all rows from the table using a `SELECT` query:
func (DB *Database) GetAll() {
	rows, err := DB.Db.Query("SELECT id, name FROM users")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		var id int
		var name string
		err := rows.Scan(&id, &name)
		if err != nil {
			panic(err)
		}
		// Process each row (e.g., print or store data)
	}
}

// 5. **Get a Single Item from the Database**:
//   - Use a `SELECT` query with a `WHERE` clause to retrieve a specific item:
func (DB *Database) GetByID() {
	var singleName string
	err := DB.Db.QueryRow("SELECT name FROM users WHERE id = ?", 1).Scan(&singleName)
	if err != nil {
		panic(err)
	}
	// Use singleName as needed
}

// 6. **Delete an Item from the Database**:
//   - Execute a `DELETE` query to remove a specific row:
func (DB *Database) DeleteByID() {
	_, err := DB.Db.Exec("DELETE FROM users WHERE id = ?", 1)
	if err != nil {
		panic(err)
	}
}

// 7. **Delete All Items in a Database**:
//   - To delete all rows from a table, use:
func (DB *Database) DeleteAll() {
	_, err := DB.Db.Exec("DELETE FROM users")
	if err != nil {
		panic(err)
	}
}
