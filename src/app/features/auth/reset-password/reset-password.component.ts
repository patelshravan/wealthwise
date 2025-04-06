import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../utils/toast.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  email = '';
  resetForm: any; // initialize later

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: ToastService,
    private router: Router
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state as {
      email: string;
    };
    if (!state?.email) {
      this.toast.showError('Missing email. Please start from Forgot Password.');
      this.router.navigate(['/auth/forgot-password']);
    } else {
      this.email = state.email;
    }

    // ✅ initialize form here AFTER fb is available
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  resetPassword() {
    const { newPassword, confirmPassword } = this.resetForm.value;

    if (newPassword !== confirmPassword) {
      this.toast.showError('Passwords do not match.');
      return;
    }
    this.authService
      .resetPassword(this.email!, newPassword!, confirmPassword!)
      .subscribe({
        next: (res: any) => {
          this.toast.showSuccess(res.message || 'Password reset successful!');
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.toast.showError(err?.error?.message || 'Reset failed.');
        },
      });
  }
}
