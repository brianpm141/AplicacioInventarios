import { Component, OnInit, signal, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../services/sidebar/sidebar.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  sidebarVisible = signal(true); 

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sidebarService.sidebarVisible$.subscribe(value => {
      this.sidebarVisible.set(value);
    });
  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }
}
