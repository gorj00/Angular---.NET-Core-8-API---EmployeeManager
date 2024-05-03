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
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component'

@Component({
  selector: 'app-employees-overview',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, TagModule, RouterLink, ConfirmPopupModule, EmployeeDetailComponent],
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
  expandedEmployeesIds: Set<number> = new Set();

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

  onExpand(employeeId: number) {
    if (this.expandedEmployeesIds.has(employeeId)) {
      this.expandedEmployeesIds.delete(employeeId);
    } else {
      this.expandedEmployeesIds.add(employeeId);
    }
    // console.log(this.expandedEmployeesIds)
  }

  getCategoryColor(categoryId: number): string {
    switch(categoryId) {
      case 1: return 'warning';
      case 3: return 'danger';
      case 4: return 'info';
      default: return 'success';
    }
  }


}
