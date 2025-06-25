import { Component, OnInit } from '@angular/core';
import { HistoryService, Movement } from '../../services/history/history.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  imports: [CommonModule]
})
export class HistoryComponent implements OnInit {
  history: Movement[] = [];
  movimientoSeleccionado: Movement | null = null;
  showDetailModal = false;
  showConfirmModal = false;
  movimientoAEliminar: Movement | null = null;
  showMessage = false;
  messageText = '';
  messageType: 'success' | 'error' = 'success';

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.historyService.getHistory().subscribe({
      next: data => this.history = data,
      error: () => this.mostrarMensaje('Error al cargar historial', 'error')
    });
  }

  mostrarDetalles(mov: Movement): void {
    this.movimientoSeleccionado = mov;
    this.showDetailModal = true;
  }

  cerrarDetalle(): void {
    this.movimientoSeleccionado = null;
    this.showDetailModal = false;
  }

  confirmarEliminacion(mov: Movement): void {
    this.movimientoAEliminar = mov;
    this.showConfirmModal = true;
  }

  cancelarEliminacion(): void {
    this.movimientoAEliminar = null;
    this.showConfirmModal = false;
  }

  ejecutarEliminacion(): void {
    if (!this.movimientoAEliminar) return;

    this.historyService.deletePermanent(this.movimientoAEliminar.id).subscribe({
      next: () => {
        this.loadHistory();
        this.mostrarMensaje('Movimiento eliminado permanentemente', 'success');
      },
      error: () => this.mostrarMensaje('Error al eliminar movimiento', 'error')
    });

    this.cancelarEliminacion();
    this.cerrarDetalle();
  }

  restaurarMovimiento(mov: Movement): void {
    this.historyService.restore(mov.id).subscribe({
      next: () => {
        this.loadHistory();
        this.mostrarMensaje('Movimiento restaurado exitosamente', 'success');
      },
      error: () => this.mostrarMensaje('Error al restaurar movimiento', 'error')
    });

    this.cerrarDetalle();
  }

  revertirCambios(): void {
    if (!this.movimientoSeleccionado) return;

    this.historyService.revert(this.movimientoSeleccionado.id).subscribe({
      next: () => {
        this.loadHistory();
        this.mostrarMensaje('Cambios revertidos exitosamente', 'success');
      },
      error: () => this.mostrarMensaje('Error al revertir cambios', 'error')
    });

    this.cerrarDetalle();
  }

  onRestaurarSeleccionado(): void {
    if (this.movimientoSeleccionado) {
      this.restaurarMovimiento(this.movimientoSeleccionado);
    }
  }

  onConfirmarEliminacionSeleccionado(): void {
    if (this.movimientoSeleccionado) {
      this.confirmarEliminacion(this.movimientoSeleccionado);
    }
  }

  mostrarMensaje(texto: string, tipo: 'success' | 'error'): void {
    this.messageText = texto;
    this.messageType = tipo;
    this.showMessage = true;
    setTimeout(() => this.showMessage = false, 3000);
  }

  getTipoMovimiento(tipo: number): string {
  switch (tipo) {
    case 1: return 'Creación';
    case 2: return 'Modificación';
    case 3: return 'Eliminación';
    case 4: return 'Eliminación Permanente';
    case 5: return 'Restauración';
    default: return 'Desconocido';
  }
}

  parseInfo(json: string | undefined | null): { key: string; value: any }[] {
    if (!json) return [];
    try {
      const parsed = JSON.parse(json);
      return Object.keys(parsed).map(key => ({ key, value: parsed[key] }));
    } catch {
      return [{ key: 'Error', value: 'Formato inválido' }];
    }
  }

  esModificacion(): boolean {
    return this.movimientoSeleccionado?.change_type === 2;
  }

  filtrarCampos(json: string | undefined | null, excluir: string[] = []): { key: string; value: any }[] {
  if (!json) return [];
  try {
    const parsed = JSON.parse(json);
    return Object.keys(parsed)
      .filter(key => !excluir.includes(key))
      .map(key => ({ key, value: parsed[key] }));
  } catch {
    return [{ key: 'Error', value: 'Formato inválido' }];
  }
}


}
