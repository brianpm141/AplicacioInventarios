import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormdepartmentComponent } from './formdepartment/formdepartment.component';
import { DepartmentService, Department } from '../../services/departments/department.service';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [ CommonModule, HttpClientModule, FormdepartmentComponent ],
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
  providers: [ DepartmentService ]
})
export class DepartmentsComponent implements OnInit {
  departments: Department[] = [];
  showModal = false;
  departamentoSeleccionado: Department | null = null;
  showDetailModal = false;
  showMessage = false;
  messageText = '';
  messageType: 'success' | 'error' = 'success';
  cargaFallida = false;
  showConfirmModal = false;
  departamentoAEliminar: Department | null = null;

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.cargarDepartamentos();
  }

  cargarDepartamentos(): void {
    this.cargaFallida = false;
    this.departmentService.getDepartments().subscribe({
      next: data => {
        this.departments = data ?? [];
        this.cargaFallida = false;
      },
      error: err => {
        console.error('Error al obtener los departamentos', err);
        this.departments = [];
        this.cargaFallida = true;
        this.mostrarMensaje('Error al obtener los departamentos', 'error');
      }
    });
  }

  abrirEditar(dept: Department): void {
    this.departamentoSeleccionado = dept;
    this.showModal = true;
  }

  abrirModal(): void {
    this.departamentoSeleccionado = null;
    this.showModal = true;
  }

  cerrarModal(): void {
    this.showModal = false;
    this.departamentoSeleccionado = null;
  }

  /** Recibido desde FormdepartmentComponent tras crear o actualizar */
  onCreated(): void {
    this.cerrarModal();
    this.cargarDepartamentos();
    const texto = this.departamentoSeleccionado
      ? 'Departamento actualizado exitosamente'
      : 'Departamento registrado exitosamente';
    this.mostrarMensaje(texto, 'success');
  }

  seleccionarDepartamento(dept: Department): void {
    this.departamentoSeleccionado = this.departamentoSeleccionado === dept ? null : dept;
  }

  eliminarDepartamento(dept: Department): void {
    this.departamentoAEliminar = dept;
    this.showConfirmModal = true;
  }

  confirmarEliminacion(): void {
    if (!this.departamentoAEliminar) return;
    this.departmentService.deleteDepartment(this.departamentoAEliminar.id!).subscribe({
      next: () => {
        this.cargarDepartamentos();
        this.mostrarMensaje('Departamento eliminado exitosamente', 'success');
      },
      error: err => {
        console.error('Error al eliminar el departamento', err);
        this.mostrarMensaje('Error eliminando el departamento.', 'error');
      }
    });
    this.showConfirmModal = false;
  }

  cancelarEliminacion(): void {
    this.showConfirmModal = false;
    this.departamentoSeleccionado = null;
  }

  mostrarMensaje(texto: string, tipo: 'success' | 'error'): void {
    this.messageText = texto;
    this.messageType = tipo;
    this.showMessage = true;
    if (tipo === 'success') {
      setTimeout(() => this.showMessage = false, 3000);
    }
  }

  mostrarDetalles(dept: Department): void {
    this.departamentoSeleccionado = dept;
    this.showDetailModal = true;
  }

  cerrarDetalle(): void {
    this.showDetailModal = false;
    this.departamentoSeleccionado = null;
  }
}
