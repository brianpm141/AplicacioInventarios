import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Movement {
  id: number;
  movement_time: string;
  affected_table: string;
  change_type: number;
  before_info: string;
  after_info: string;
  object_id: number;
  user_id: number;
  user_name: string;
  status: number;
}

@Injectable({ providedIn: 'root' })
export class HistoryService {
  private baseUrl = `${environment.apiUrl}/api/history`;

  constructor(private http: HttpClient) {}

  getHistory(): Observable<Movement[]> {
    return this.http.get<Movement[]>(this.baseUrl);
  }

  restore(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/restore/${id}`, {});
  }

  deletePermanent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-permanent/${id}`);
  }

  revert(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/revert/${id}`, {});
  }
}
