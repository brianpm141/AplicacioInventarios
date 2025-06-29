import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class AuthService {

  private apiUrl = `${environment.apiUrl}/api/auth`;
  private tokenKey = 'auth-token';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
  return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
    .pipe(tap(response => {
      localStorage.setItem('auth-token', response.token);
      localStorage.setItem('auth-user', JSON.stringify({
        username: response.username,
        role: response.role
      }));
    }));
}


  logout() {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth-token');
  }

  getUser(): { username: string, role: number } | null {
  const user = localStorage.getItem('auth-user');
  return user ? JSON.parse(user) : null
}
}
