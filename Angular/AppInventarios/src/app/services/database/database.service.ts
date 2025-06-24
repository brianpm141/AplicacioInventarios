import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class DatabaseService {
  private api = 'http://localhost:3000/api/database';
  constructor(private http: HttpClient) {}

  export() {
    return this.http.get(`${this.api}/export`, { responseType: 'blob' });
  }

  restore(file: File) {
    const form = new FormData();
    form.append('file', file, file.name);
    return this.http.post(`${this.api}/restore`, form);
  }

  getBackupConfig() {
  return this.http.get<any>('http://localhost:3000/api/backup-config');
}

saveBackupConfig(data: any) {
  return this.http.post('http://localhost:3000/api/backup-config', data);
}

}
