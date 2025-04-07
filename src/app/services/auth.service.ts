import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private apiUrl = 'http://localhost:5000/v1/auth';
  private apiUrl = 'https://wealthwise-backend-6nis.onrender.com/v1/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    return this.http.post(`${this.apiUrl}/register`, {
      name,
      email,
      password,
      confirmPassword,
    });
  }

  verifyOtp(email: string, otp: string, type: 'email' | 'reset' | 'password') {
    return this.http.post(`${this.apiUrl}/verify-otp`, { email, otp, type });
  }

  resendOtp(email: string, type: 'email' | 'reset' | 'password') {
    if (type === 'reset') {
      return this.http.post(`${this.apiUrl}/resend-password-reset-otp`, {
        email,
      });
    } else {
      return this.http.post(`${this.apiUrl}/resend-otp`, { email, type });
    }
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(email: string, newPassword: string, confirmPassword: string) {
    return this.http.post(`${this.apiUrl}/reset-password`, {
      email,
      newPassword,
      confirmPassword,
    });
  }
}
