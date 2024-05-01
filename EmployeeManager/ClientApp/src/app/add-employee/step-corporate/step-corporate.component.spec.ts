import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepCorporateComponent } from './step-corporate.component';

describe('StepCorporateComponent', () => {
  let component: StepCorporateComponent;
  let fixture: ComponentFixture<StepCorporateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepCorporateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepCorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
