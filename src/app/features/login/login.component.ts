import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ToastService } from '../../utils/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: any;
  hidePassword = true;
  userName = localStorage.getItem('userName') || '';

  ngOnInit() {
    // Load saved credentials if remembered
    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedPassword = localStorage.getItem('rememberedPassword');

    if (savedEmail && savedPassword) {
      this.loginForm.patchValue({
        email: savedEmail,
        password: savedPassword,
        rememberMe: true,
      });
    }
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: ToastService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  login() {
    const { email, password, rememberMe } = this.loginForm.value;

    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
      localStorage.setItem('rememberedPassword', password);
    } else {
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberedPassword');
    }

    this.authService.login(email, password).subscribe({
      next: (res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('userName', res.name);
          const message = (res as any)?.message || 'Login successful!';
          this.toast.showSuccess(message);
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err: { error: { message: string } }) => {
        this.toast.showError('Login failed: ' + err.error.message);
      },
    });
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }

  goToForgotPassword() {
    this.router.navigate(['/auth/forgot-password']);
  }
}
