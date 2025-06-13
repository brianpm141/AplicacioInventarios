import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormdepartmentComponent } from './formdepartment.component';

describe('FormdepartmentComponent', () => {
  let component: FormdepartmentComponent;
  let fixture: ComponentFixture<FormdepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormdepartmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormdepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
