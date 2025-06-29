import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loggin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.css'] // nota: debe ser style**Urls**
})
export class LogginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

login() {
  if (this.loginForm.invalid) return;

  const { username, password } = this.loginForm.value;

  this.authService.login(username, password).subscribe({
    next: (res) => {
      this.authService.notifyAuthChange(); // notifica que se logueó
      this.router.navigate(['/homepage']);
    },
    error: (err) => {
      alert(err.error.message || 'Error al iniciar sesión');
    }
  });
} 
}
