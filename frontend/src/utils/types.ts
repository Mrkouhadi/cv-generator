export type User = {
    readonly ID:number
    Name:string
    Email:string
    Photo?:string
    Birthdate?:Date
    Telephone:string
    Address:string
    JobTitle:string
    Description:string
}
export type Education = {
    readonly ID:number
    readonly UserID:number
    Major:string
    University:string
    Country:string
    City:string
    StartDate:Date
    EndDate:Date
}
export type Experience = {
    readonly ID:number
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
    readonly ID:number
    readonly UserID:number
    Type:string
    Title:string
    Scale:number // from 1 to 5 
}