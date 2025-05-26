import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDevicesComponent } from './main-devices.component';

describe('MainDevicesComponent', () => {
  let component: MainDevicesComponent;
  let fixture: ComponentFixture<MainDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainDevicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
