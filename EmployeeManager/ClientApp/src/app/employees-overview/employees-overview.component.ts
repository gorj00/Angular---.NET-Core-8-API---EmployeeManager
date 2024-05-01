import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EmployeeManagerService } from '../services/employee-manager.service';
import { IEmployeeResponse } from '../../models/employee.model';

@Component({
  selector: 'app-employees-overview',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, TagModule, RouterLink],
  templateUrl: './employees-overview.component.html',
  styleUrl: './employees-overview.component.scss'
})
export class EmployeesOverviewComponent implements OnInit {

  constructor(private employeeManagerService: EmployeeManagerService) {

  }

  ngOnInit(): void {
    this.employeeManagerService.getEmployees().subscribe(e => this.employees = e)
  }


  employees: IEmployeeResponse[] = []


}
