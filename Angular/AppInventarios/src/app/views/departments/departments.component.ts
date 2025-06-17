import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
  departamentoSeleccionado: any = null;
  showDetailModal = false;
  showMessage = false;
  messageText = '';
  messageType: 'success' | 'error' = 'success';

  showConfirmModal = false;
  departamentoAEliminar: any = null;

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.cargarDepartamentos();
  }

  cargarDepartamentos(): void {
    this.departmentService.getDepartments().subscribe({
      next: data => this.departments = data ?? [],
      error: err => {
        console.error('Error al obtener los departamentos', err);
        this.departments = [];
        this.mostrarMensaje('Error al obtener los departamentos', 'error');
      }
    });
  }

  abrirEditar(dept: any) {
    this.departamentoSeleccionado = dept;
    this.showModal = true;
  }

  abrirModal() {
    this.departamentoSeleccionado = null;
    this.showModal = true;
  }

  cerrarModal(): void {
    this.showModal = false;
  }

  onCreated(): void {
    this.cargarDepartamentos();

    if (this.departamentoSeleccionado) {
      this.mostrarMensaje('Departamento actualizado exitosamente', 'success');
    } else {
      this.mostrarMensaje('Departamento registrado exitosamente', 'success');
    }
  }

  seleccionarDepartamento(dept: any): void {
    this.departamentoSeleccionado = this.departamentoSeleccionado === dept ? null : dept;
  }

  eliminarDepartamento(department: any): void {
    this.departamentoAEliminar = department;
    this.showConfirmModal = true;
  }

  confirmarEliminacion(): void {
    if (!this.departamentoAEliminar) return;

    this.departmentService.deleteDepartment(this.departamentoAEliminar.id).subscribe({
      next: () => {
        this.cargarDepartamentos();
        this.mostrarMensaje('Departamento eliminado exitosamente', 'success');
      },
      error: (err) => {
        console.error('Error al eliminar el departamento', err);
        this.mostrarMensaje('Error eliminando el departamento.', 'error');
      }
    });

    this.showConfirmModal = false;
  }

  cancelarEliminacion(): void {
    this.showConfirmModal = false;
  }

  mostrarMensaje(texto: string, tipo: 'success' | 'error') {
    this.messageText = texto;
    this.messageType = tipo;
    this.showMessage = true;
    setTimeout(() => this.showMessage = false, 3000);
  }

  mostrarDetalles(dept: any) {
  this.departamentoSeleccionado = dept;
  this.showDetailModal = true;
}

cerrarDetalle() {
  this.showDetailModal = false;
}
}
