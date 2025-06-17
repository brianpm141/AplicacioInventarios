import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '../../../services/departments/department.service';

@Component({
  selector: 'app-formdepartment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],  // <-- aquí es clave
  templateUrl: './formdepartment.component.html',
  styleUrls: ['./formdepartment.component.css'],
  providers: [DepartmentService]
})


export class FormdepartmentComponent implements OnChanges {

  @Input() isVisible = false;
  @Input() departmentToEdit: any = null;  // <-- Nuevo input
  @Output() closed = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();

  departmentForm: FormGroup;

  constructor(private fb: FormBuilder, private departmentService: DepartmentService) {
    this.departmentForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      lider: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.maxLength(180)]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['departmentToEdit'] && this.departmentToEdit) {
      this.departmentForm.patchValue({
        nombre: this.departmentToEdit.name,
        lider: this.departmentToEdit.department_head,
        descripcion: this.departmentToEdit.description
      });
    } else if (!this.departmentToEdit) {
      this.departmentForm.reset();
    }
  }

  get nombre() { return this.departmentForm.get('nombre'); }
  get lider() { return this.departmentForm.get('lider'); }
  get descripcion() { return this.departmentForm.get('descripcion'); }

  onSubmit() {
    if (this.departmentForm.invalid) return;

    const formData = {
      name: this.nombre?.value,
      department_head: this.lider?.value,
      description: this.descripcion?.value
    };

    if (this.departmentToEdit) {
      this.departmentService.updateDepartment(this.departmentToEdit.id, formData).subscribe(() => {
        this.created.emit();
        this.closeModal();
      });
    } else {
      this.departmentService.createDepartment(formData).subscribe(() => {
        this.created.emit();
        this.closeModal();
      });
    }
  }

  closeModal() {
    this.closed.emit();
  }
}
