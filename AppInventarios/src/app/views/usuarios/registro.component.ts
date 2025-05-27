import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroExitoso = false;

  constructor(private router: Router) {}

  registrarUsuario(form: any) {
  if (form.invalid) {
    return; // Evita continuar si el formulario está incompleto
  }
  this.registroExitoso = true;
  setTimeout(() => {
    this.router.navigate(['/usuarios']);
  }, 2500);
}

  regresar() {
    this.router.navigate(['/usuarios']);
  }
}


