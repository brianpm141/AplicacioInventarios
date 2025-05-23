import { Component } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  mostrarModal: boolean = false;
  usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: ''
  };

  abrirRegistro() {
    this.mostrarModal = true;
  }

  cerrarRegistro() {
    this.mostrarModal = false;
  }

  registrarUsuario() {
    console.log('Usuario registrado:', this.usuario);
    // Aquí puedes agregar la lógica para enviar los datos al backend
    this.cerrarRegistro();
  }
}