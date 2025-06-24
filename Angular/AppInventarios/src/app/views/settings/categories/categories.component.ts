import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../../services/categories/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  categoryForm: FormGroup;
  isEditing = false;
  editId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoriesService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      type: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe((data: any) => {
      this.categories = data;
    });
  }

  submitForm() {
    if (this.categoryForm.invalid) return;

    if (this.isEditing && this.editId !== null) {
      this.categoryService.update(this.editId, this.categoryForm.value).subscribe(() => {
        this.resetForm();
        this.loadCategories();
      });
    } else {
      this.categoryService.create(this.categoryForm.value).subscribe(() => {
        this.resetForm();
        this.loadCategories();
      });
    }
  }

  editCategory(category: any) {
    this.categoryForm.patchValue({
      name: category.name,
      description: category.description,
      type: category.type
    });
    this.isEditing = true;
    this.editId = category.id;
  }

  deleteCategory(id: number) {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      this.categoryService.delete(id).subscribe(() => {
        this.loadCategories();
      });
    }
  }

  resetForm() {
    this.categoryForm.reset({ type: 1 });
    this.isEditing = false;
    this.editId = null;
  }

  getTypeLabel(type: number): string {
  return type === 0 ? 'Equipos' : 'Consumibles';
  }
}
