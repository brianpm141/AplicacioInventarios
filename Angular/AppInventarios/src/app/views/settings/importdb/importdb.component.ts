import { Component }        from '@angular/core';
import { CommonModule }     from '@angular/common';
import { FormsModule }      from '@angular/forms';
import { DatabaseService } from '../../../services/database/database.service';

@Component({
  selector: 'app-importdb',
  standalone: true,          // marca standalone
  imports: [ CommonModule, FormsModule ],  // importa sólo lo necesario
  templateUrl: './importdb.component.html',
  styleUrls: ['./importdb.component.css']
})

export class ImportdbComponent {
  selectedFile: File | null = null;
  message = '';
  error = false;
  cargando = false;
  showConfirm = false;


  constructor(private dbService: DatabaseService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.message = '';
    }
  }

  abrirConfirmacion(): void {
  if (!this.selectedFile) {
    this.error = true;
    this.message = 'Seleccione un archivo .sql antes de importar.';
    return;
  }
  this.showConfirm = true;
}
  confirmImport(): void {
  if (!this.selectedFile) return;

  this.showConfirm = false;
  this.cargando = true;

  this.dbService.restore(this.selectedFile).subscribe({
    next: (res: any) => {
      this.error = false;
      this.message = res.message || 'Restauración exitosa.';
      this.selectedFile = null;
      this.cargando = false;
    },
    error: err => {
      this.error = true;
      this.message = err.error?.error || 'Error al restaurar la base de datos.';
      this.cargando = false;
    }
  });
}

cancelImport(): void {
  this.showConfirm = false;
}
  

}

