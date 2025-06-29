import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private apiUrl = `${environment.apiUrl}/api/categories`; // Ajusta al host real

  constructor(private http: HttpClient) {}

  // Obtener todas las categorías
  getAll() {
    return this.http.get(this.apiUrl);
  }

  // Crear una nueva categoría
  create(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  // Actualizar una categoría
  update(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // Eliminar una categoría
  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Obtener los campos personalizados de una categoría
  getCustomFields(categoryId: number) {
    return this.http.get(`${this.apiUrl}/fields/${categoryId}`);
  }

  // Crear un campo personalizado para una categoría
  createCustomField(data: any) {
    return this.http.post(`${this.apiUrl}/addField`, data);
  }
}
