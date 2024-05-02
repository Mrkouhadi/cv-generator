export type User = {
    Name:string
    Email:string
    Photo?:string
    Birthdate?:Date
    Telephone:string
    Address:string
    Nationality:string
    JobTitle:string
    Description:string
}
export type Education = {
    readonly UserID:number
    Degree:string
    Major:string
    University:string
    Country:string
    City:string
    StartDate:Date
    EndDate:Date
}
export type Experience = {
    readonly UserID:number
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
    readonly UserID:number
    Title:string
    Proficiency:string
}
export type Language={
    readonly UserID:number
    Language:string
    Proficiency:string
}