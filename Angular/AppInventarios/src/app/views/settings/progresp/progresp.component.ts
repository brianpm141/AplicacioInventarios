import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../../../services/database/database.service';

@Component({
  selector: 'app-progresp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './progresp.component.html',
  styleUrls: ['./progresp.component.css']
})
export class ProgrespComponent implements OnInit {
  tipo: 'diario' | 'semanal' | 'mensual' | 'anual' = 'diario';
  dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  diaSemana: string = 'Lunes';
  diaMes: number = 1;
  mesAnual: string = 'Enero';
  diaAnual: number = 1;

  horaSeleccionada: string = '08';
  minutoSeleccionado: string = '00';
  meridiano: 'AM' | 'PM' = 'AM';

  horas: string[] = [];
  minutos: string[] = [];

  ultimoBackup: Date | null = null;

  constructor(private dbService: DatabaseService) {}

  ngOnInit(): void {
    this.horas = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    this.minutos = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

    this.dbService.getBackupConfig().subscribe(config => {
      if (config) {
        this.tipo = config.tipo;
        this.diaSemana = config.dia_semana || 'Lunes';
        this.diaMes = Math.min(config.dia_mes || 1, 28);
        this.mesAnual = config.mes_anual || 'Enero';
        this.diaAnual = Math.min(config.dia_anual || 1, 28);

        if (config.hora) {
          const match = config.hora.match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s?(AM|PM)?$/i);
          if (match) {
            let h = parseInt(match[1], 10);
            const m = match[2];
            const mer = match[3]?.toUpperCase() as 'AM' | 'PM' | undefined;

            if (mer) {
              this.meridiano = mer;
              this.horaSeleccionada = h.toString().padStart(2, '0');
              this.minutoSeleccionado = m;
            } else {
              // convertir 24h a 12h si no viene con AM/PM
              this.meridiano = h >= 12 ? 'PM' : 'AM';
              if (h === 0) h = 12;
              else if (h > 12) h -= 12;
              this.horaSeleccionada = h.toString().padStart(2, '0');
              this.minutoSeleccionado = m;
            }
          }
        }

        this.ultimoBackup = config.ultimo_respaldo ? new Date(config.ultimo_respaldo) : null;
      }
    });
  }

  onTipoChange() {
    switch (this.tipo) {
      case 'semanal':
        this.diaSemana = 'Lunes';
        break;
      case 'mensual':
        this.diaMes = 1;
        break;
      case 'anual':
        this.mesAnual = 'Enero';
        this.diaAnual = 1;
        break;
    }
  }

  validarDiaMes(): void {
    if (this.diaMes > 28) this.diaMes = 28;
  }

  validarDiaAnual(): void {
    if (this.diaAnual > 28) this.diaAnual = 28;
  }

  convertirHoraA24h(hora: string, minuto: string, meridiano: 'AM' | 'PM'): string {
    let h = parseInt(hora, 10);
    if (meridiano === 'PM' && h < 12) h += 12;
    if (meridiano === 'AM' && h === 12) h = 0;
    return `${h.toString().padStart(2, '0')}:${minuto.padStart(2, '0')}:00`;
  }

  guardarConfiguracion() {
    const horaFinal = this.convertirHoraA24h(this.horaSeleccionada, this.minutoSeleccionado, this.meridiano);

    const config = {
      tipo: this.tipo,
      dia_semana: this.tipo === 'semanal' ? this.diaSemana : null,
      dia_mes: this.tipo === 'mensual' ? this.diaMes : null,
      mes_anual: this.tipo === 'anual' ? this.mesAnual : null,
      dia_anual: this.tipo === 'anual' ? this.diaAnual : null,
      hora: horaFinal
    };

    this.dbService.saveBackupConfig(config).subscribe({
      next: () => alert('Configuración guardada exitosamente'),
      error: () => alert('Error al guardar configuración')
    });
  }
}
