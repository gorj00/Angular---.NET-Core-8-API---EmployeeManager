import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs/internal/Subscription';
import { EmployeeManagerService } from './services/employee-manager.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ButtonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'MountfieldApp';
  subs: Subscription = new Subscription();

  constructor(private employeeManagerService: EmployeeManagerService) {}

  ngOnInit(): void {

    // Employees
    this.subs.add(this.employeeManagerService.getEmployees().subscribe(employees => this.employeeManagerService.employees = employees));

    // JobCategories
    this.subs.add(this.employeeManagerService.getJobCategories().subscribe(cats => this.employeeManagerService.jobCategories = cats));

    // Countries
    this.subs.add(this.employeeManagerService.getCountries().subscribe(countries => this.employeeManagerService.countries = countries));

    // Cities
    this.subs.add(this.employeeManagerService.getCities().subscribe(cities => this.employeeManagerService.cities = cities));

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
