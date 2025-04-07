import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  // private apiUrl = 'http://localhost:5000/v1/expense';
  private apiUrl = 'https://wealthwise-backend-6nis.onrender.com/v1/expense';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  create(amount: string, category: string, note: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, {
      amount,
      category,
      note,
    });
  }

  update(
    id: string,
    amount: string,
    category: string,
    note: number
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, {
      amount,
      category,
      note,
    });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
