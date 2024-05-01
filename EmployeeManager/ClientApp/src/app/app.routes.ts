import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./employees-overview/employees-overview.component').then(mod => mod.EmployeesOverviewComponent)},
    { path: 'add', loadChildren: () => import('./add-employee/add-employee.routes').then(r => r.ADD_EMPLOYEE_ROUTES)},

];
