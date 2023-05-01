import { CountryModel } from "./CountryModel";
import { ZoneModel } from "./ZoneModel";

export interface PhoneBookModel {
  Id?:number;
  Name? : string ;
  LastName? : string ;
  Phone? : string ;
  Email? : string ;
  ZoneId?:number;
  Zone?:ZoneModel;
  CountryId?:number;
  Country?:CountryModel,
  IsActive?:boolean;
  UserId?:string;
}


