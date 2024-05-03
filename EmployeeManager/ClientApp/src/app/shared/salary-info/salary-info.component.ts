import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ISalary } from '../../../models/employee.model'
import { IconTextFieldComponent } from '../icon-text-field/icon-text-field.component';

@Component({
  selector: 'app-salary-info',
  standalone: true,
  imports: [CommonModule, IconTextFieldComponent],
  templateUrl: './salary-info.component.html',
  styleUrl: './salary-info.component.scss'
})
export class SalaryInfoComponent {

  @Input() salary?: ISalary 

}
