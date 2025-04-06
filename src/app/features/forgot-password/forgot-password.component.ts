import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../utils/toast.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  forgotForm: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: ToastService,
    private router: Router
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  sendOtp() {
    const email = this.forgotForm.value.email!;
    this.authService.forgotPassword(email).subscribe({
      next: (res: any) => {
        this.toast.showSuccess(res.message || 'OTP sent to your email.');
        this.router.navigate(['/auth/verify-otp/reset'], {
          state: { email },
        });
      },
      error: (err) => {
        this.toast.showError(err.error.message || 'Something went wrong');
      },
    });
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
