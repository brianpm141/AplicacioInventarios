// importdb.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportdbComponent } from './importdb.component';
import { DatabaseService } from '../../../services/database/database.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

describe('ImportdbComponent', () => {
  let component: ImportdbComponent;
  let fixture: ComponentFixture<ImportdbComponent>;
  let dbService: DatabaseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportdbComponent],
      imports: [HttpClientTestingModule],
      providers: [DatabaseService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportdbComponent);
    component = fixture.componentInstance;
    dbService = TestBed.inject(DatabaseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error if no file selected', () => {
    component.selectedFile = null;
    component.onImport();
    expect(component.error).toBeTrue();
    expect(component.message).toContain('Seleccione un archivo');
  });

  it('should import successfully', () => {
    spyOn(dbService, 'restore').and.returnValue(of({ message: 'OK' }));
    component.selectedFile = new File([''], 'backup.sql', { type: 'application/sql' });
    component.onImport();
    expect(component.error).toBeFalse();
    expect(component.message).toBe('OK');
  });

  it('should handle import error', () => {
    const err = { error: { error: 'Fallo servidor' } };
    spyOn(dbService, 'restore').and.returnValue(throwError(() => err));
    component.selectedFile = new File([''], 'backup.sql', { type: 'application/sql' });
    component.onImport();
    expect(component.error).toBeTrue();
    expect(component.message).toBe('Fallo servidor');
  });
});
