import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../../../services/database/database.service'; // asegúrate de tener la ruta correcta

@Component({
  selector: 'app-autobackup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './autobackup.component.html',
  styleUrls: ['./autobackup.component.css']
})
export class ProgrespComponent implements OnInit {
  tipo: 'diario' | 'semanal' | 'mensual' | 'anual' = 'diario';
  dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  diaSemana: string = 'Lunes';
  diaMes: number = 1;
  mesAnual: string = 'Enero';
  hora: string = '00:00';

  ultimoBackup: Date | null = null;

  constructor(private dbService: DatabaseService) {}

  ngOnInit(): void {
    this.dbService.getBackupConfig().subscribe(config => {
      if (config) {
        this.tipo = config.tipo;
        this.diaSemana = config.dia_semana || 'Lunes';
        this.diaMes = config.dia_mes || 1;
        this.mesAnual = config.mes_anual || 'Enero';
        this.hora = config.hora;
        this.ultimoBackup = config.ultimo_respaldo ? new Date(config.ultimo_respaldo) : null;
      }
    });
  }

  onTipoChange() {
    if (this.tipo === 'semanal') this.diaSemana = 'Lunes';
    if (this.tipo === 'mensual') this.diaMes = 1;
    if (this.tipo === 'anual') this.mesAnual = 'Enero';
  }

  guardarConfiguracion() {
    const config = {
      tipo: this.tipo,
      diaSemana: this.tipo === 'semanal' ? this.diaSemana : null,
      diaMes: this.tipo === 'mensual' ? this.diaMes : null,
      mesAnual: this.tipo === 'anual' ? this.mesAnual : null,
      hora: this.hora
    };

    this.dbService.saveBackupConfig(config).subscribe({
      next: () => alert('Configuración guardada exitosamente'),
      error: () => alert('Error al guardar configuración')
    });
  }
}
