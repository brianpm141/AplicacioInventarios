import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Department {
  id?: number;
  name: string;
  description: string;
  department_head: string | null;
  status?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'http://localhost:3000/api/departments';

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }

  createDepartment(department: Department): Observable<any> {
    return this.http.post(this.apiUrl, department);
  }

  deleteDepartment(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/delete`, {});
  }
}
