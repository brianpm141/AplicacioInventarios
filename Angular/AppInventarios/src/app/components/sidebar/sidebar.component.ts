import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../services/sidebar/sidebar.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  sidebarVisible = signal(true);
  role: number | null = null;

  constructor(private sidebarService: SidebarService,
    private authService: AuthService
  ) {
    const user = this.authService.getUser();
      this.role = user?.role ?? null;
  }

  ngOnInit(): void {
    this.sidebarService.sidebarVisible$.subscribe(value => {
      this.sidebarVisible.set(value);
    });
  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }
}
