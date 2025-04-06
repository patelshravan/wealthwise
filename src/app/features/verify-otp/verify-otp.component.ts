import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../utils/toast.service';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss'],
})
export class VerifyOtpComponent {
  otpForm: any;
  type: 'email' | 'reset' | 'password' = 'email';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService
  ) {
    this.otpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required, Validators.minLength(4)]],
    });

    this.type = (this.route.snapshot.paramMap.get('type') as any) || 'email';
  }

  verifyOtp() {
    const { email, otp } = this.otpForm.value;

    if (!email || !otp) {
      this.toast.showError('Please fill in all fields.');
      return;
    }

    this.authService.verifyOtp(email, otp, this.type).subscribe({
      next: (res: { message?: string }) => {
        this.toast.showSuccess(res.message || 'OTP verified successfully!');

        // 🚀 Navigate based on verification type
        if (this.type === 'email') {
          this.router.navigate(['/auth/login']);
        } else if (this.type === 'reset') {
          this.router.navigate(['/auth/reset-password'], {
            state: { email }, // ✅ pass email to reset password
          });
        } else if (this.type === 'password') {
          this.router.navigate(['/auth/change-password']);
        }
      },
      error: (err) => {
        const errorMsg = err?.error?.message || 'OTP verification failed.';
        this.toast.showError(errorMsg);
      },
    });
  }

  resendOtp(event?: Event) {
    event?.preventDefault();

    const email = this.otpForm.value.email;

    if (!email) {
      this.toast.showError('Please enter your email to resend OTP.');
      return;
    }

    this.authService.resendOtp(email, this.type).subscribe({
      next: (res: any) => {
        this.toast.showSuccess(res.message || 'OTP resent successfully.');
      },
      error: (err) => {
        const errorMsg = err?.error?.message || 'Failed to resend OTP.';
        this.toast.showError(errorMsg);
      },
    });
  }
}
