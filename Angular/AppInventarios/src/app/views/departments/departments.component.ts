import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormdepartmentComponent } from './formdepartment/formdepartment.component';
import { DepartmentService } from '../../services/departments/department.service';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormdepartmentComponent],
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
  providers: [DepartmentService]
})
export class DepartmentsComponent implements OnInit {
  departments: any[] = [];
  showModal = false;
  showSuccessMessage = false;
  departamentoSeleccionado: any = null;

  constructor(private http: HttpClient, private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.cargarDepartamentos();
  }

  cargarDepartamentos(): void {
    this.http.get<any[]>('http://localhost:3000/api/departments').subscribe({
      next: data => this.departments = data ?? [],
      error: err => {
        console.error('Error al obtener los departamentos', err);
        this.departments = [];
      }
    });
  }

  abrirModal(): void {
    this.showModal = true;
  }

  cerrarModal(): void {
    this.showModal = false;
  }

  onCreated(): void {
    this.cargarDepartamentos();
    this.showSuccessMessage = true;
    setTimeout(() => this.showSuccessMessage = false, 5000);
  }

  seleccionarDepartamento(dept: any): void {
    this.departamentoSeleccionado = this.departamentoSeleccionado === dept ? null : dept;
  }

  eliminarDepartamento(department: any): void {
    if (confirm('¿Seguro que deseas eliminar este departamento?')) {
      this.departmentService.deleteDepartment(department.id).subscribe({
        next: () => {
          alert('Departamento eliminado exitosamente.');
          this.cargarDepartamentos();
        },
        error: (err) => {
          console.error('Error al eliminar el departamento', err);
          alert('Error eliminando el departamento.');
        }
      });
    }
  }
}
