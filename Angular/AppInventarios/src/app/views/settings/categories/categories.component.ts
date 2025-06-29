import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Asegúrate de importar CommonModule
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CategoriesService } from '../../../services/categories/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Asegúrate de agregar CommonModule aquí
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  categoryForm: FormGroup;
  isEditing = false;
  editId: number | null = null;
  customFields: any[] = [];

  successMessage: string | null = null;
  errorMessage: string | null = null;
  confirmId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoriesService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      type: [0, Validators.required],  // 0 = Equipos, 1 = Consumibles
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (data: any) => this.categories = data,
      error: () => this.showError('Error al cargar categorías')
    });
  }

  loadCustomFields(categoryId: number) {
    this.categoryService.getCustomFields(categoryId).subscribe({
      next: (data: any) => {
        this.customFields = data;
        // Añadir los campos personalizados al formulario
        this.customFields.forEach(field => {
          this.categoryForm.addControl(field.name, this.fb.control('', Validators.required));
        });
      },
      error: () => this.showError('Error al cargar campos personalizados')
    });
  }

  submitForm() {
    if (this.categoryForm.invalid) return;

    const action = this.isEditing && this.editId !== null
      ? this.categoryService.update(this.editId, this.categoryForm.value)
      : this.categoryService.create(this.categoryForm.value);

    action.subscribe({
      next: () => {
        this.showSuccess(this.isEditing ? 'Categoría actualizada' : 'Categoría creada');
        this.resetForm();
        this.loadCategories();
      },
      error: () => this.showError('Error al guardar categoría')
    });
  }

  editCategory(category: any) {
    this.categoryForm.patchValue({
      name: category.name,
      description: category.description,
      type: category.type
    });
    this.isEditing = true;
    this.editId = category.id;
    this.loadCustomFields(category.id);  // Cargar los campos personalizados
  }

  confirmDelete(id: number) {
    this.confirmId = id;
  }

  deleteCategory(id: number) {
    this.categoryService.delete(id).subscribe({
      next: () => {
        this.showSuccess('Categoría eliminada');
        this.confirmId = null;
        this.loadCategories();
      },
      error: () => {
        this.showError('Error al eliminar categoría');
        this.confirmId = null;
      }
    });
  }

  resetForm() {
    this.categoryForm.reset({ type: 0 });
    this.isEditing = false;
    this.editId = null;
    this.customFields = [];
  }

  getTypeLabel(type: number): string {
    return type === 0 ? 'Equipos' : 'Consumibles';
  }

  showSuccess(msg: string) {
    this.successMessage = msg;
    setTimeout(() => this.successMessage = null, 3000);
  }

  showError(msg: string) {
    this.errorMessage = msg;
    setTimeout(() => this.errorMessage = null, 3000);
  }
}
