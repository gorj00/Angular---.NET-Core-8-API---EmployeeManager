import { Injectable } from "@angular/core";
import { EGender, IGender } from "../../models/identity.model";

@Injectable({providedIn: 'root'})
export class EmployeeUtilsService {
    
  genders: IGender[]  = [
    { genderId: EGender.MALE, label: 'Male' },
    { genderId: EGender.FEMALE, label: 'Female' },
    { genderId: EGender.UNSPECIFIED, label: 'Unspecified' },
  ]

}