import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  registroExitoso = false;

  constructor(private router: Router) {}

  registrarUsuario() {
    this.registroExitoso = true;
    setTimeout(() => {
      this.router.navigate(['/usuarios']);
    }, 2000);
  }

  regresar() {
    this.router.navigate(['/usuarios']);
  }

  irARegistro() {
    this.router.navigate(['/usuarios/registro']); 
  }
}



