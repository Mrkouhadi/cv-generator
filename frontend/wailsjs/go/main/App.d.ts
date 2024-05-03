// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
import {main} from '../models';

export function AddEducation(arg1:string):Promise<void>;

export function AddExperience(arg1:string):Promise<void>;

export function AddLanguage(arg1:string):Promise<void>;

export function AddSkill(arg1:string):Promise<void>;

export function AddUser(arg1:string):Promise<void>;

export function DeleteAllEducation():Promise<void>;

export function DeleteAllExperience():Promise<void>;

export function DeleteAllLanguage():Promise<void>;

export function DeleteAllSkill():Promise<void>;

export function DeleteAllUsers():Promise<void>;

export function DeleteEducationByID(arg1:number):Promise<void>;

export function DeleteExperienceByID(arg1:number):Promise<void>;

export function DeleteLanguageByID(arg1:number):Promise<void>;

export function DeleteSkillByID(arg1:number):Promise<void>;

export function DeleteUserByID(arg1:number,arg2:string):Promise<void>;

export function GetAllEducation(arg1:number):Promise<Array<main.Education>>;

export function GetAllExperience(arg1:number):Promise<Array<main.Experience>>;

export function GetAllLanguages(arg1:number):Promise<Array<main.Language>>;

export function GetAllSkills(arg1:number):Promise<Array<main.Skill>>;

export function GetAllUsers():Promise<Array<main.User>>;

export function GetEducationByID(arg1:number):Promise<main.Education>;

export function GetExperienceByID(arg1:number):Promise<main.Experience>;

export function GetLanguageByID(arg1:number):Promise<main.Language>;

export function GetSkillByID(arg1:number):Promise<main.Skill>;

export function GetUserByID(arg1:number):Promise<main.User>;

export function Greet(arg1:string):Promise<string>;

export function SendPdfFile(arg1:string,arg2:string):Promise<void>;

export function SendPngFile(arg1:string):Promise<void>;

export function UpdateEducation(arg1:main.Education):Promise<void>;

export function UpdateExperience(arg1:main.Experience):Promise<void>;

export function UpdateLanguage(arg1:main.Language):Promise<void>;

export function UpdateSkill(arg1:main.Skill):Promise<void>;

export function UpdateUser(arg1:string):Promise<void>;
