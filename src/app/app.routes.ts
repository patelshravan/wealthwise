import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { RegisterComponent } from './features/register/register.component';
import { VerifyOtpComponent } from './features/verify-otp/verify-otp.component';
import { AuthGuard } from './guards/auth.guard';
import { UserAuthGuard } from './guards/user-auth.guard';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './features/reset-password/reset-password.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'verify-otp/:type', component: VerifyOtpComponent },
    ],
  },
  {
    path: 'dashboard',
    canActivate: [UserAuthGuard],
    component: DashboardComponent,
  },
];
