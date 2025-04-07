import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  private apiUrl = 'https://wealthwise-backend-6nis.onrender.com/v1/auth';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  create(
    type: string,
    name: string,
    amountInvested: number,
    currentValue: number,
    startDate: string
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, {
      type,
      name,
      amountInvested,
      currentValue,
      startDate,
    });
  }

  update(
    id: string,
    type: string,
    name: string,
    amountInvested: number,
    currentValue: number,
    startDate: string
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, {
      type,
      name,
      amountInvested,
      currentValue,
      startDate,
    });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
