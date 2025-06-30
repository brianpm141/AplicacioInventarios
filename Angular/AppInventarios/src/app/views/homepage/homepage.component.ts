import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-homepage',
  imports: [CommonModule, RouterModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent { 

  role: number | null = null;

  constructor(private authService: AuthService) {
    const user = this.authService.getUser();
    this.role = user?.role ?? null;
  }

}
