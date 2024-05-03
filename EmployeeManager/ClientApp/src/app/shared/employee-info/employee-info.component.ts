import { Component, Input } from '@angular/core';
import { IEmployee } from '../../../models/employee.model';
import { IconTextFieldComponent } from '../icon-text-field/icon-text-field.component';
import { CommonModule } from '@angular/common';
import { EmployeeUtilsService } from '../../services/employee-utils.service';
import { EGender, IGender } from '../../../models/identity.model';

@Component({
  selector: 'app-employee-info',
  standalone: true,
  imports: [CommonModule, IconTextFieldComponent],
  templateUrl: './employee-info.component.html',
  styleUrl: './employee-info.component.scss'
})
export class EmployeeInfoComponent {

  @Input() employee?: IEmployee
  @Input() showAddress = true;

  constructor(private employeeUtilsService: EmployeeUtilsService) {}

  genders: IGender[] = this.employeeUtilsService.genders;

  getGenderById(id: number| null | undefined): string {
    if (id != undefined && id !== null)
      return this.genders?.find((c: IGender) => c.genderId === id)?.label || ''
    else return '';
  }

  getFullName(): string {
    if (this.employee)
      return ''.concat(this.employee.firstName, ' ', this.employee?.middleName ? this.employee?.middleName + ' ' : '', this.employee.lastName )
    else return '';
  }

  getGenderIcon() {
    if (this.employee) {
      switch(this.employee.gender) {
        case 0: return 'pi-mars';
        case 1: return 'pi-venus';
        default: return 'pi-users';
      }
    }

    return 'pi-users';
  }

}
