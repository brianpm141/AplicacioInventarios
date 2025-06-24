import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExportdbComponent } from './exportdb.component';
import { DatabaseService } from '../../../services/database/database.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

describe('ExportdbComponent', () => {
  let component: ExportdbComponent;
  let fixture: ComponentFixture<ExportdbComponent>;
  let dbService: jasmine.SpyObj<DatabaseService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExportdbComponent],
      imports: [HttpClientTestingModule],
      providers: [DatabaseService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportdbComponent);
    component = fixture.componentInstance;
    dbService = TestBed.inject(DatabaseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should export successfully', () => {
    const fakeBlob = new Blob(['sql'], { type: 'application/sql' });
    spyOn(dbService, 'export').and.returnValue(of(fakeBlob));

    component.onExport();

    expect(dbService.export).toHaveBeenCalled();
    expect(component.cargando).toBeFalse();
    expect(component.error).toBeFalse();
    expect(component.message).toBe('Exportación exitosa.');
  });

  it('should handle export error', () => {
    spyOn(dbService, 'export').and.returnValue(throwError(() => new Error('fail')));

    component.onExport();

    expect(dbService.export).toHaveBeenCalled();
    expect(component.cargando).toBeFalse();
    expect(component.error).toBeTrue();
    expect(component.message).toBe('Error al generar el backup.');
  });

  it('should not export if already loading', () => {
    component.cargando = true;
    spyOn(dbService, 'export');

    component.onExport();

    expect(dbService.export).not.toHaveBeenCalled();
  });
});
