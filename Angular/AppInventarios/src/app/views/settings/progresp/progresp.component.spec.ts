import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrespComponent } from './progresp.component';

describe('ProgrespComponent', () => {
  let component: ProgrespComponent;
  let fixture: ComponentFixture<ProgrespComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrespComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgrespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
