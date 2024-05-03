import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTextFieldComponent } from './icon-text-field.component';

describe('IconTextFieldComponent', () => {
  let component: IconTextFieldComponent;
  let fixture: ComponentFixture<IconTextFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconTextFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IconTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
