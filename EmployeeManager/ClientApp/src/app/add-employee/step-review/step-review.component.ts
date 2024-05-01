import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ICity, ICountry, IEmployee, IJobCategory, INewEmployeeForm } from '../../../models/employee.model'
import { IGender } from '../../../models/identity.model';

@Component({
  selector: 'app-step-review',
  standalone: true,
  imports: [ReactiveFormsModule, CardModule, CommonModule],
  templateUrl: './step-review.component.html',
  styleUrl: './step-review.component.scss'
})
export class StepReviewComponent {

  @Input() formValue?: INewEmployeeForm
  @Input() cities?: ICity[];
  @Input() countries?: ICountry[];
  @Input() genders?: { genderId: IGender; label: string; }[];
  @Input() employees?: IEmployee[]
  @Input() categories?: IJobCategory[]

  getCityById(id: number | undefined): string {
    if (id)
      return this.cities?.find(c => c.id === id)?.name || ''
    else return '';
  }

  getCountryById(id: number | null | undefined): string {
    if (id)
      return this.countries?.find(c => c.id === id)?.name || ''
    else return '';
  }

  getGenderById(id: number| null | undefined): string {
    if (id)
      return this.genders?.find(c => c.genderId === id)?.label || ''
    else return '';
  }

  getCategoryById(id: number | null | undefined): string {
    if (id)
      return this.categories?.find(c => c.id === id)?.title || ''
    else return '';
  }

  getEmployeeById(id: number  | null | undefined): string {
    if (!id)
      return '';

    const employee: IEmployee | undefined = this.employees?.find(c => c.id === id)

    if (employee)
      return employee.firstName + ' ' + employee.lastName;
    else return '';
  }

}
