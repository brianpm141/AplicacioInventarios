import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaVistaComponent } from './plantilla-vista.component';

describe('PlantillaVistaComponent', () => {
  let component: PlantillaVistaComponent;
  let fixture: ComponentFixture<PlantillaVistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantillaVistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantillaVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
