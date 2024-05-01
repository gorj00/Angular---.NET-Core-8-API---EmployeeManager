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
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subject, Subscription, exhaustMap, withLatestFrom, map, catchError, EMPTY } from 'rxjs';
import { ICity, ICountry, IEmployee, IJobCategory, INewEmployeeForm } from '../../models/employee.model';
import { IGender } from '../../models/identity.model';
import { MessageService } from 'primeng/api';
import { EmployeeManagerService } from '../services/employee-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, InputNumberModule, CheckboxModule, ButtonModule, InputTextModule, ToastModule,
    StepPersonalComponent, StepCorporateComponent, StepReviewComponent, StepperModule, CardModule, ReactiveFormsModule
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
  providers: [RouterOutlet, MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEmployeeComponent implements OnInit, OnDestroy {

  saveBtnClickSubject: Subject<void> = new Subject();
  saveBtnClick$: Observable<void> = this.saveBtnClickSubject.asObservable();
  saveActionSubscription: Subscription = new Subscription();

  genders: { genderId: IGender, label: string }[] = [
    { genderId: IGender.MALE, label: 'Male' },
    { genderId: IGender.FEMALE, label: 'Female' },
    { genderId: IGender.UNSPECIFIED, label: 'Unspecified' },
  ]

  items?: {label: string, routerLink: string}[]
  activeStep = 0;
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
      email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(250)]],
      phone: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
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

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private employeeManagerService: EmployeeManagerService,
    private router: Router) {}

  formValue: INewEmployeeForm = {}
  formValueSub$: Subscription = new Subscription();
  employees: IEmployee[] = this.employeeManagerService.employees;
  countries: ICountry[] = this.employeeManagerService.countries;
  cities: ICity[] = this.employeeManagerService.cities;
  categories: IJobCategory[] = this.employeeManagerService.jobCategories;

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

  onSave() {
    if (this.addEmployeeForm.valid) {
      this.saveBtnClickSubject.next();
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Cannot create an employee', detail: 'The form is not valid!' });
    }
  }

  getCategoryById(id: number): string {
      return this.categories?.find(c => c.id === id)?.title || ''
  }

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

    this.formValueSub$.add(this.addEmployeeForm.valueChanges.subscribe(val => {this.formValue = val; console.log(val)}));

    this.saveActionSubscription.add(this.saveBtnClick$.pipe(
      exhaustMap(() => this.employeeManagerService.createEmployee(this.employeeManagerService.mapFormToRequest(this.formValue)).pipe(
        map(() => this.onSaveSuccess()),
        catchError(() => { this.onSaveFailure(); return EMPTY; })
      ))
    ).subscribe());

  }

  ngOnDestroy(): void {
    this.formValueSub$.unsubscribe();
    this.saveActionSubscription.unsubscribe();
  }

  onSaveSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Employee created', detail: 'Employee successfully created! You will be redirected to new form' })

    setTimeout(() => {/*this.router.navigate(['/']); */window.location.reload()}, 3500);
  }

  onSaveFailure() {
    this.messageService.add({ severity: 'danger', summary: 'Employee not create', detail: 'Employee not created successfully due to an error!' })
  }




}
