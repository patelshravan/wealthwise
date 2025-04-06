import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { UserAuthGuard } from './guards/user-auth.guard';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './components/layout/auth-layout/auth-layout.component';
import { InvestmentsListComponent } from './features/investments/InvestmentList/investments-list.component';
import { InvestmentFormComponent } from './features/investments/AddEditInvestment/investment-form.component';
import { ExpenseListComponent } from './features/expenses/ExpensesList/expense-list.component';
import { ExpenseFormComponent } from './features/expenses/AddEditExpenses/expense-form.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './features/auth/reset-password/reset-password.component';
import { VerifyOtpComponent } from './features/auth/verify-otp/verify-otp.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { PolicyListComponent } from './features/lic-policies/PolicyList/policy-list.component';
import { PolicyFormComponent } from './features/lic-policies/AddEditPolicy/policy-form.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'verify-otp/:type', component: VerifyOtpComponent },
    ],
  },
  // Main app routes
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [UserAuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'investments',
        children: [
          { path: '', component: InvestmentsListComponent },
          { path: 'add', component: InvestmentFormComponent },
          { path: 'edit/:id', component: InvestmentFormComponent },
        ],
      },
      {
        path: 'expenses',
        children: [
          { path: '', component: ExpenseListComponent },
          { path: 'add', component: ExpenseFormComponent },
          { path: 'edit/:id', component: ExpenseFormComponent },
        ],
      },
      {
        path: 'policies',
        children: [
          { path: '', component: PolicyListComponent },
          { path: 'add', component: PolicyFormComponent },
          { path: 'edit/:id', component: PolicyFormComponent },
        ],
      },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
