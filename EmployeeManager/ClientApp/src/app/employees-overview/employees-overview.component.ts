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
          this.employeeManagerService.getEmployees().pipe(take(1)).subscribe(
            // TODO: Refetching issue - Did not work with updating service's employees directly, possibly will have to switch to observable instead of service property, temp workaround:
            () => window.location.reload())
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
    this.employeesLoading = this.employeeManagerService.employeesLoading;
    this.employees = this.employeeManagerService.employees
  }



}
