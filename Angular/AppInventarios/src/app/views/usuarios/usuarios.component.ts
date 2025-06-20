import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './registro/registro.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, RegistroComponent],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  usuarios = [
    {
      id: 1,
      nombre: 'Ana',
      apellidos: 'Ramírez',
      usuario: 'aramirez',
      departamento: 'Almacén',
      rol: 'Usuario'
    },
    {
      id: 2,
      nombre: 'Carlos',
      apellidos: 'Méndez',
      usuario: 'cmendez',
      departamento: 'Compras',
      rol: 'Administrador'
    }
  ];

  usuarioSeleccionado: any = null;
  usuarioAEliminar: any = null;
  showModal = false;
  showDetailModal = false;
  showConfirmModal = false;

  abrirModal(): void {
    this.usuarioSeleccionado = null;
    this.showDetailModal = false;
    this.showModal = true;
  }

  cerrarModal(): void {
    this.showModal = false;
  }

  onCreated(): void {
    this.cerrarModal();
    // recarga la lista vía servicio si es necesario
  }

  abrirEditar(usuario: any): void {
    this.usuarioSeleccionado = usuario;
    this.showDetailModal = false;
    this.showModal = true;
  }

  mostrarDetalles(usuario: any): void {
    this.usuarioSeleccionado = usuario;
    this.showDetailModal = true;
  }

  cerrarDetalle(): void {
    this.usuarioSeleccionado = null;
    this.showDetailModal = false;
  }

  openConfirmDelete(usuario: any): void {
    this.usuarioAEliminar = usuario;
    this.showConfirmModal = true;
  }

  cancelarEliminacion(): void {
    this.usuarioAEliminar = null;
    this.showConfirmModal = false;
  }

  confirmarEliminacion(): void {
    if (this.usuarioAEliminar) {
      this.usuarios = this.usuarios.filter(u => u.id !== this.usuarioAEliminar.id);
      this.usuarioAEliminar = null;
    }
    this.showConfirmModal = false;
  }
}
