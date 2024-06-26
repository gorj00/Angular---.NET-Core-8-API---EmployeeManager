import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryInfoComponent } from './salary-info.component';

describe('SalaryInfoComponent', () => {
  let component: SalaryInfoComponent;
  let fixture: ComponentFixture<SalaryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalaryInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalaryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
