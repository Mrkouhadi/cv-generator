export type User = {
    ID?:number
    Name:string
    Email:string
    Photo:string
    Birthdate:Date
    Telephone:string
    Address:string
    Nationality:string
    JobTitle:string
    Description:string
}
export type Education = {
    ID?:number
    UserID:number
    Degree:string
    Major:string
    University:string
    Country:string
    City:string
    StartDate:Date
    EndDate:Date
}
export type Experience = {
    ID?:number
    UserID:number
    Field:string
    JobTitle:string
    Company:string
    Country:string
    City:string
    Description:string
    StartDate:Date
    EndDate:Date
}
export type Skill={
    ID?:number
    UserID:number
    Title:string
    Proficiency:string
}
export type Language={
    ID?:number
    UserID:number
    Language:string
    Proficiency:string
}