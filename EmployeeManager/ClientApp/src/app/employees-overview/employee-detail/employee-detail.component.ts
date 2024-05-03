import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { IEmployee } from '../../../models/employee.model';
import { EmployeeInfoComponent } from '../../shared/employee-info/employee-info.component';
import { DividerModule } from 'primeng/divider';
import { SalaryInfoComponent } from '../../shared/salary-info/salary-info.component';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, AccordionModule, EmployeeInfoComponent, DividerModule, SalaryInfoComponent],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss'
})
export class EmployeeDetailComponent {

  @Input() employee?: IEmployee

}
