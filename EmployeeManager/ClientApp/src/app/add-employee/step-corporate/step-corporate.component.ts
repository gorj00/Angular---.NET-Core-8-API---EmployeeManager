import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { IEmployeeResponse } from '../../../models/employee.model';

@Component({
  selector: 'app-step-corporate',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, InputNumberModule, CardModule, DropdownModule, ReactiveFormsModule, TagModule],
  templateUrl: './step-corporate.component.html',
  styleUrl: './step-corporate.component.scss'
})
export class StepCorporateComponent {

  @Input() corporateForm?: FormGroup
  @Input() attemptedLeaveOnInvalid?: boolean
  @Input() employees?: IEmployeeResponse[]
  @Input() categories?: { id: number; name: string; }[]

  inputErrMsg = ' is missing or invalid'

  // Invalid error message shown if: 1) There was an attempt to go to next step and control value is invalid  2) Control value is dirty and invalid
  isCorporateControlValid(controlName: string) {
    return (this.attemptedLeaveOnInvalid || this.corporateForm?.controls[controlName]?.dirty) && !this.corporateForm?.controls[controlName]?.valid;
  }

}
