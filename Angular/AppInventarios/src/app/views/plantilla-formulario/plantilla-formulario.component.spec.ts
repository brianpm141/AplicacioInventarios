import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaFormularioComponent } from './plantilla-formulario.component';

describe('PlantillaFormularioComponent', () => {
  let component: PlantillaFormularioComponent;
  let fixture: ComponentFixture<PlantillaFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantillaFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantillaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
