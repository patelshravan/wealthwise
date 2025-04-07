import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SavingService {
  private apiUrl = 'http://localhost:5000/v1/savings';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  create(amount: string, note: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, {
      amount,
      note,
    });
  }

  update(id: string, amount: string, note: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, {
      amount,
      note,
    });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
