import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./employees-overview/employees-overview.component').then(mod => mod.EmployeesOverviewComponent)},
    { path: 'add', loadComponent: () => import('./add-employee/add-employee.component').then(mod => mod.AddEmployeeComponent)},

];
