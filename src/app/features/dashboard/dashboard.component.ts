import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  balance: number = 15240.75;
  investments = 9050.5;
  expenses = 22222.5;
  savings = 5000.25;
  lic = 1190.0;

  summaryCards = [
    {
      title: 'Total Balance',
      icon: 'account_balance_wallet',
      value: this.balance,
    },
    { title: 'Investments', icon: 'trending_up', value: this.investments },
    { title: 'Expenses', icon: 'trending_up', value: this.expenses },
    { title: 'Savings', icon: 'savings', value: this.savings },
    { title: 'LIC Policies', icon: 'policy', value: this.lic },
  ];
}
