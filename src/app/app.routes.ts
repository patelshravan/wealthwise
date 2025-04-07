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
import { SavingListComponent } from './features/savings/SavingsList/savings-list.component';
import { SavingFormComponent } from './features/savings/AddEditSavings/savings-form.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { breadcrumb: 'Login' },
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: { breadcrumb: 'Register' },
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: { breadcrumb: 'Forgot Password' },
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        data: { breadcrumb: 'Reset Password' },
      },
      {
        path: 'verify-otp/:type',
        component: VerifyOtpComponent,
        data: { breadcrumb: 'Verify OTP' },
      },
    ],
  },
  // Main app routes
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [UserAuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { breadcrumb: 'Dashboard' },
      },
      {
        path: 'investments',
        data: { breadcrumb: 'Investments' },
        children: [
          {
            path: '',
            component: InvestmentsListComponent,
            data: { breadcrumb: 'List' },
          },
          {
            path: 'add',
            component: InvestmentFormComponent,
            data: { breadcrumb: 'Add Investment' },
          },
          {
            path: 'edit/:id',
            component: InvestmentFormComponent,
            data: { breadcrumb: 'Edit Investment' },
          },
        ],
      },
      {
        path: 'expenses',
        data: { breadcrumb: 'Expenses' },
        children: [
          {
            path: '',
            component: ExpenseListComponent,
            data: { breadcrumb: 'List' },
          },
          {
            path: 'add',
            component: ExpenseFormComponent,
            data: { breadcrumb: 'Add Expense' },
          },
          {
            path: 'edit/:id',
            component: ExpenseFormComponent,
            data: { breadcrumb: 'Edit Expense' },
          },
        ],
      },
      {
        path: 'savings',
        data: { breadcrumb: 'Savings' },
        children: [
          {
            path: '',
            component: SavingListComponent,
            data: { breadcrumb: 'List' },
          },
          {
            path: 'add',
            component: SavingFormComponent,
            data: { breadcrumb: 'Add Saving' },
          },
          {
            path: 'edit/:id',
            component: SavingFormComponent,
            data: { breadcrumb: 'Edit Saving' },
          },
        ],
      },
      {
        path: 'policies',
        data: { breadcrumb: 'LIC Policies' },
        children: [
          {
            path: '',
            component: PolicyListComponent,
            data: { breadcrumb: 'List' },
          },
          {
            path: 'add',
            component: PolicyFormComponent,
            data: { breadcrumb: 'Add Policy' },
          },
          {
            path: 'edit/:id',
            component: PolicyFormComponent,
            data: { breadcrumb: 'Edit Policy' },
          },
        ],
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
