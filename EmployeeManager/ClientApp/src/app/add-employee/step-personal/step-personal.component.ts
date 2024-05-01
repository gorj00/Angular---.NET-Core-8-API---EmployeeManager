import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { StepperModule } from 'primeng/stepper';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { IGender } from '../../../models/identity.model';
import { ICity, ICountry } from '../../../models/employee.model';

@Component({
  selector: 'app-step-personal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, InputNumberModule, CardModule, StepperModule, DropdownModule,
    CalendarModule, AutoCompleteModule
  ],
  templateUrl: './step-personal.component.html',
  styleUrl: './step-personal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepPersonalComponent implements OnInit {

  @Input() identityForm?: FormGroup
  @Input() addressForm?: FormGroup
  @Input() attemptedLeaveOnInvalid?: boolean;
  @Input() cities?: ICity[];
  @Input() countries?: ICountry[];
  @Input() genders?: { genderId: IGender, label: string }[];

  filteredCities?: any;
  inputErrMsg = ' is missing or invalid'

  ngOnInit(): void {
    this.personalInformation = {
      age: 20,
      firstname: 'Jon',
      lastname: 'Last'
    }

  }
  personalInformation: any

  // Invalid error message shown if: 1) There was an attempt to go to next step and control is invalid  2) COntrol is dirty and invalid
  isIdentityControlValid(controlName: string) {
    return (this.attemptedLeaveOnInvalid || this.identityForm?.controls[controlName]?.dirty) && !this.identityForm?.controls[controlName]?.valid;
  }

  isAddressControlValid(controlName: string) {
    return (this.attemptedLeaveOnInvalid || this.addressForm?.controls[controlName]?.dirty) && !this.addressForm?.controls[controlName]?.valid;
  }

  filterCity(event: { originalEvent: Event; query: string; }) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.cities as any[]).length; i++) {
        let city = (this.cities as any[])[i];
        if (city.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(city);
        }
    }

    this.filteredCities = filtered;
}

}
