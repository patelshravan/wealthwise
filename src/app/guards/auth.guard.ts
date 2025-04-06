import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      // Already logged in → redirect to dashboard
      this.router.navigate(['/dashboard']);
      return false;
    }

    // Not logged in → allow access to login/register
    return true;
  }
}
