import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '../../../services/departments/department.service';

@Component({
  selector: 'app-formdepartment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formdepartment.component.html',
  styleUrls: ['./formdepartment.component.css'],
  providers: [DepartmentService]
})
export class FormdepartmentComponent implements OnChanges {
  @Input() isVisible = false;
  @Output() closed = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();

  departmentForm: FormGroup;
  private fb = inject(FormBuilder);
  private departmentService = inject(DepartmentService);

  constructor() {
    this.departmentForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      lider: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isVisible']) {
      document.body.style.overflow = this.isVisible ? 'hidden' : '';
    }
  }

  @HostListener('window:keydown.escape', ['$event'])
  onEsc(event: KeyboardEvent): void {
    this.closeModal();
  }

  closeModal(): void {
    this.closed.emit();
  }

  onSubmit(): void {
    if (this.departmentForm.valid) {
      const { nombre, descripcion, lider } = this.departmentForm.value;
      const newDept = { name: nombre, description: descripcion, department_head: lider };
      this.departmentService.createDepartment(newDept).subscribe({
        next: () => {
          console.log('Departamento creado exitosamente');
          this.created.emit();
          this.closeModal();
        },
        error: err => console.error('Error al crear departamento', err)
      });
    } else {
      // Aquí forzamos que todos los campos muestren sus errores
      this.departmentForm.markAllAsTouched();
    }
  }

  // Getters para usar en el template y mostrar errores
  get nombre() { return this.departmentForm.get('nombre')!; }
  get descripcion() { return this.departmentForm.get('descripcion')!; }
  get lider() { return this.departmentForm.get('lider')!; }
}
