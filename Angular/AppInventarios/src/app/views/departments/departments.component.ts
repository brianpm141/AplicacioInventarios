import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormdepartmentComponent } from './formdepartment/formdepartment.component';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormdepartmentComponent],
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  departments: any[] = [];
  showModal = false;
  departamentoSeleccionado: any = null;

  constructor(private http: HttpClient) {}

  seleccionarDepartamento(dept: any): void {
  if (this.departamentoSeleccionado === dept) {
    this.departamentoSeleccionado = null; // deseleccionar si es el mismo
  } else {
    this.departamentoSeleccionado = dept;
    console.log('Departamento seleccionado:', this.departamentoSeleccionado);
  }
}

  ngOnInit(): void {
    this.cargarDepartamentos();
  }

  cargarDepartamentos(): void {
    this.http.get<any[]>('http://localhost:3000/api/departments').subscribe({
      next: (data) => {
        this.departments = data ?? [];
      },
      error: (err) => {
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
}


}
