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
  @Output() created = new EventEmitter<void>();  // para notificar que se creó

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
      if (this.isVisible) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
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
      const formValue = this.departmentForm.value;

      const newDepartment = {
        name: formValue.nombre,
        description: formValue.descripcion,
        department_head: formValue.lider
      };

      this.departmentService.createDepartment(newDepartment).subscribe({
        next: () => {
          console.log('Departamento creado exitosamente');
          this.created.emit();  // avisamos al padre
          this.closeModal();
        },
        error: (err) => {
          console.error('Error al crear departamento', err);
        }
      });
    } else {
      this.departmentForm.markAllAsTouched();
    }
  }
}
