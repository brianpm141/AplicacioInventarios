import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '../../../services/department.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-formdepartment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formdepartment.component.html',
  styleUrls: ['./formdepartment.component.css']
})
export class FormdepartmentComponent implements OnChanges {
  @Input() isVisible = false;
  @Output() closed = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();

  departmentForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private departmentService: DepartmentService) {
    this.departmentForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(25)]],
      descripcion: ['', [Validators.required, Validators.maxLength(120)]],
      lider: ['', [Validators.required, Validators.maxLength(60)]]
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
    this.departmentForm.reset();
    this.successMessage = null;
    this.errorMessage = null;
    this.isSubmitting = false;
    this.closed.emit();
  }

  onSubmit(): void {
    if (this.departmentForm.valid) {
      this.isSubmitting = true;

      const formValue = this.departmentForm.value;
      const newDepartment = {
        name: formValue.nombre,
        description: formValue.descripcion,
        department_head: formValue.lider
      };

      this.departmentService.createDepartment(newDepartment).subscribe({
        next: () => {
          this.successMessage = 'Registro completado exitosamente';
          this.created.emit();
          timer(2000).subscribe(() => this.closeModal());
        },
        error: () => {
          this.errorMessage = 'Ocurrió un problema al registrar';
          this.isSubmitting = false;
        }
      });
    } else {
      this.departmentForm.markAllAsTouched();
    }
  }
}
