import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { RouterOutlet } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { StepPersonalComponent } from './step-personal/step-personal.component';
import { StepCorporateComponent } from './step-corporate/step-corporate.component';
import { StepReviewComponent } from './step-review/step-review.component'; 
import { StepperModule } from 'primeng/stepper';
import { CardModule } from 'primeng/card';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { INewEmployeeForm } from '../../models/employee.model';
import { IGender } from '../../models/identity.model';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, InputNumberModule, CheckboxModule, ButtonModule, InputTextModule, ToastModule,
    StepPersonalComponent, StepCorporateComponent, StepReviewComponent, StepperModule, CardModule, ReactiveFormsModule
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
  providers: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEmployeeComponent implements OnInit, OnDestroy {

  genders: { genderId: IGender, label: string }[] = [
    { genderId: IGender.MALE, label: 'Male' },
    { genderId: IGender.FEMALE, label: 'Female' },
    { genderId: IGender.UNSPECIFIED, label: 'Unspecified' },
  ]

  // TODO: mocked
  categories = [
    { name: 'Finance', id: 1},
    { name: 'Development', id: 2},
    { name: 'HR', id: 3}
  ]

  employees = [
    { id: 1, name: 'John Doe', category: 'Finance'},
    { id: 2, name: 'Jane Doe', category: 'Development'},
    { id: 3, name: 'Tim Doe', category: 'HR'}
  ]

  items?: {label: string, routerLink: string}[]
  countries?: { id: number, name: string}[]
  cities?: { id: number, name: string}[]
  activeStep = 2; // Todo: restore to 0
  nextStepAttempted: any = {
    identity: false,
    address: false
  }
  flagAttemptedStepLeaveOnInvalid = false;

  addEmployeeForm = this.fb.group({
    identity: this.fb.group({
      genderId: [null, Validators.required],
      firstName: ['Jan', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      birthDate: [null, Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.minLength(3)]],
      phone: ['', Validators.required],
    }),
    address: this.fb.group({
      street: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      city: [null, [Validators.required]],
      countryId: [null, [Validators.required]],
    }),
    corporate: this.fb.group({
      salary: [null, [Validators.required, Validators.min(1)]],
      superiorId: [null],
      jobCategoryId: [null, Validators.required],
    })
  });

  formValue?: INewEmployeeForm
  formValueSub$: Subscription = new Subscription();
  
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Personal information',
        routerLink: 'personal'
      },
      {
        label: 'Corporate information',
        routerLink: 'corporate'
      },
      {
        label: 'Review information',
        routerLink: 'review'
      }
    ];


      // TODO: mocked
      this.countries = [
        { id: 1, name: 'Česká republika'},
        { id: 2, name: 'Slovensko'}
      ]
  
      // TODO: mocked
      this.cities = [
        { id: 1, name: 'Praha'},
        { id: 2, name: 'Brno'},
        { id: 3, name: 'Bratislava'}
      ]

    this.formValueSub$.add(this.addEmployeeForm.valueChanges.subscribe(val => {this.formValue = val; console.log(val)}));
  }

  ngOnDestroy(): void {
    this.formValueSub$.unsubscribe();
  }

  onChangeStep(toStep: number) {
    // Non-existing steps
    if (toStep > 2 || toStep < 0)
      return;

    // Restore flag
    if (this.flagAttemptedStepLeaveOnInvalid) this.flagAttemptedStepLeaveOnInvalid = false;

    const currentStepFormsValid = this.currentStepFormsValid();

    // Always allow when going to previous step, next step allowed only if current step's forms are valid
    if (toStep < this.activeStep || currentStepFormsValid)
      this.activeStep = toStep;

    // If not valid, flag there was an attempt to leave to trigger the input error messages of current forms
    if (!currentStepFormsValid) this.flagAttemptedStepLeaveOnInvalid = true;
  }

  currentStepFormsValid(): boolean {
    switch(this.activeStep) {
      case 0: { return this.addEmployeeForm.controls.identity.valid && this.addEmployeeForm.controls.address.valid; }
      case 1: { return this.addEmployeeForm.controls.corporate.valid; }
      default: { return false; }
    }
  }


  

}
