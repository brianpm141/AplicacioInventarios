import {
  Component,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService, Department } from '../../../services/departments/department.service';

@Component({
  selector: 'app-formdepartment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formdepartment.component.html',
  styleUrls: ['./formdepartment.component.css'],
  providers: [DepartmentService]
})
export class FormdepartmentComponent implements OnChanges {
  @Input() departmentToEdit: Department | null = null;
  @Input() isVisible = false;
  @Output() created = new EventEmitter<boolean>();
  @Output() closed  = new EventEmitter<void>();

  departmentForm!: FormGroup;
  private fb = inject(FormBuilder);
  private departmentService = inject(DepartmentService);

  ngOnChanges(changes: SimpleChanges) {
    // Cuando el modal se abre (isVisible === true)
    if (changes['isVisible'] && changes['isVisible'].currentValue) {
      // 1) reiniciamos el form
      this.initForm();

      // 2) si venimos a editar, parcheamos los valores
      if (this.departmentToEdit) {
        this.departmentForm.patchValue({
          name:            this.departmentToEdit.name,
          department_head: this.departmentToEdit.department_head,
          abbreviation:    this.departmentToEdit.abbreviation,
          description:     this.departmentToEdit.description
        });
      }
    }
  }

  private initForm() {
    this.departmentForm = this.fb.group({
      name:            ['', Validators.required],
      department_head: ['', Validators.required],
      abbreviation:    ['', [Validators.required, Validators.maxLength(4)]],
      description:     ['', Validators.required],
    });
  }

  onSubmit() {
    this.departmentForm.markAllAsTouched();
    if (this.departmentForm.invalid) return;

    const obs = this.departmentToEdit
      ? this.departmentService.updateDepartment(this.departmentToEdit.id!, this.departmentForm.value)
      : this.departmentService.createDepartment(this.departmentForm.value);

    obs.subscribe({
      next: () => {
        this.created.emit(true);
        this.onClose();
        this.departmentForm.reset();
      },
      error: err => {
        console.error(err);
        this.onClose();
      }
    });
  }

  onClose(): void {
    this.closed.emit();
  }
}
