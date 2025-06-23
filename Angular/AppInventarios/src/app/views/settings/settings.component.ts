import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportdbComponent } from './exportdb/exportdb.component';
import { ImportdbComponent } from './importdb/importdb.component';
import { BuildingComponent } from '../building/building.component';
import { AutobackupComponent } from './autobackup/autobackup.component';
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ExportdbComponent, ImportdbComponent, BuildingComponent, AutobackupComponent],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  opcion: string = '';
}
