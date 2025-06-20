import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id?: number;
  nombre: string;
  apellidos: string;
  usuario: string;
  departamento: string;
  rol: string;
  contrasena?: string;
}

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  // Ajusta según tu environment.apiUrl (p.ej. 'http://localhost:3000/api')
  private apiUrl = `${window.location.origin.replace(/:\d+$/, ':3000')}/api/users`;

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  createUsuario(u: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, u);
  }

  updateUsuario(id: number, u: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, u);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
