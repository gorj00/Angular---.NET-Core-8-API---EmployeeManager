import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employees-overview',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, TagModule, RouterLink],
  templateUrl: './employees-overview.component.html',
  styleUrl: './employees-overview.component.scss'
})
export class EmployeesOverviewComponent {

  employees: any = [
  {
    name: 'Jon Smith',
    category: 'Finance',
    phone: '+420 777 884 589',
    email: 'iamjohn@domain.com',
    city: 'Prague',
    active: true
  },
  {
    name: 'Jon Smith',
    category: 'Finance',
    phone: '+420 777 884 589',
    email: 'iamjohn@domain.com',
    city: 'Prague',
    active: true
  }
]

}
