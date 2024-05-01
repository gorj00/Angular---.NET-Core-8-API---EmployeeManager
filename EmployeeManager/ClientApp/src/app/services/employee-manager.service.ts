import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IEmployeeCreateRequest } from '../../models/employee.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { INewEmployeeForm, IAddressCreateDto } from '../../models/employee.model'
@Injectable({providedIn: 'root'})
export class EmployeeManagerService {

    constructor(private httpService: HttpService) {}

    createEmployee(employeeReq: IEmployeeCreateRequest): Observable<any> {
        return this.httpService.Post(environment.apiUrl + 'Employees', employeeReq);
    }

    mapFormToRequest(form: INewEmployeeForm): IEmployeeCreateRequest {

        const addressDto: IAddressCreateDto =  {
            cityId: form?.address?.city?.id,
            countryId: form?.address?.countryId,
            street: form?.address?.street,
            zipCode: form?.address?.zipCode
        }

        return {
            firstName: form?.identity?.firstName,
            lastName: form?.identity?.lastName,
            middleName: form?.identity?.middleName,
            birthDate: form?.identity?.birthDate?.toISOString(),
            gender: form?.identity?.genderId,
            email: form?.identity?.email,
            phoneNumber: form?.identity?.phone,
            salary: form?.corporate?.salary,
            jobCategoryId: form?.corporate?.jobCategoryId,
            superiorId: form?.corporate?.superiorId,
            addressCreateDTO: addressDto
        }
    }
}
