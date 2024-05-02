import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IJobCategory, IEmployeeCreateRequest, IEmployee, ICity, INewEmployeeForm, IAddressCreateDto, ICountry } from '../../models/employee.model';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment'

@Injectable({providedIn: 'root'})
export class EmployeeManagerService {

  employees: IEmployee[] = []
  jobCategories: IJobCategory[] = []
  countries: ICountry[] = []
  cities: ICity[] = []
  // employeesLoading = true;

  constructor(private httpService: HttpService) {}

  createEmployee(employeeReq: IEmployeeCreateRequest): Observable<any> {
      return this.httpService.Post(environment.apiUrl + 'Employees', employeeReq);
  }

  getEmployees(): Observable<IEmployee[]> {
      return this.httpService.Get(environment.apiUrl + 'Employees');
  }

  getJobCategories(): Observable<IJobCategory[]> {
      return this.httpService.Get(environment.apiUrl + 'JobCategories');
  }

  getCities(): Observable<ICity[]> {
      return this.httpService.Get(environment.apiUrl + 'Cities');
  }

  getCountries(): Observable<ICountry[]> {
      return this.httpService.Get(environment.apiUrl + 'Countries');
  }

  deleteEmployee(id: number): Observable<void[]> {
      return this.httpService.Delete(environment.apiUrl + 'Employees/' + id);
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
