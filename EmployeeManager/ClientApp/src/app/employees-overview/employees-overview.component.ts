import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EmployeeManagerService } from '../services/employee-manager.service';
import { IEmployee } from '../../models/employee.model';
import { take } from 'rxjs';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
  selector: 'app-employees-overview',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, TagModule, RouterLink, ConfirmPopupModule],
  templateUrl: './employees-overview.component.html',
  styleUrl: './employees-overview.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class EmployeesOverviewComponent implements OnInit {

  constructor(
    private employeeManagerService: EmployeeManagerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  employeesLoading: boolean = true;
  employees: IEmployee[] = []

  onDelete(id: number) {
    this.employeeManagerService.deleteEmployee(id).pipe(take(1)).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Employee deleted', detail: 'Employee successfully deleted! ' })
          this.employeesLoading = true;
          this.employeeManagerService.getEmployees().pipe(take(1)).subscribe(
            employees =>{ this.employees = employees; this.employeesLoading = false;}
          )
    })
  }

  confirmDelete(event: Event, id: number) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure you want to delete the employee?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => this.onDelete(id),
        reject: () => {}
    });
  }

    confirmEdit(event: Event, id: number) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'TODO',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {},
        reject: () => {}
    });
  }

  ngOnInit(): void {
    this.employeeManagerService.getEmployees().subscribe(employees => {
      this.employees = employees;
      this.employeesLoading = false;
    })
  }



}
