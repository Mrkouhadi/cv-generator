package main

import "time"

type User struct {
	ID          int
	Name        string
	Email       string
	Photo       string
	Birthdate   time.Time
	Telephone   string
	Address     string
	Nationality string
	JobTitle    string
	Description string
}

type Education struct {
	ID         int
	UserID     int
	Degree     string
	Major      string
	University string
	Country    string
	City       string
	StartDate  time.Time
	EndDate    time.Time
}

type Experience struct {
	ID          int
	UserID      int
	Field       string
	JobTitle    string
	Company     string
	Country     string
	City        string
	Description string
	StartDate   time.Time
	EndDate     time.Time
}

type Skill struct {
	ID          int
	UserID      int
	Title       string
	Proficiency string
}

type Language struct {
	ID          int
	UserID      int
	Language    string
	Proficiency string
}
