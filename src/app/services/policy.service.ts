import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  private apiUrl = 'https://wealthwise-backend-6nis.onrender.com/v1/auth';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  create(
    policyNumber: string,
    policyName: string,
    premiumAmount: number,
    dueDate: number,
    maturityDate: string
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, {
      policyNumber,
      policyName,
      premiumAmount,
      dueDate,
      maturityDate,
    });
  }

  update(
    id: string,
    policyNumber: string,
    policyName: string,
    premiumAmount: number,
    dueDate: number,
    maturityDate: string
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, {
      policyNumber,
      policyName,
      premiumAmount,
      dueDate,
      maturityDate,
    });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
