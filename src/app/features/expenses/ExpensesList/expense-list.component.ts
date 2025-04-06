import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ExpenseService } from '../../../services/expense.service';

@Component({
  standalone: true,
  selector: 'app-expenses-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
})
export class ExpenseListComponent implements OnInit {
  expenses: any[] = [];

  constructor(private expenseService: ExpenseService, private router: Router) {}

  ngOnInit(): void {
    this.fetchExpenses();
  }

  fetchExpenses(): void {
    this.expenseService.getAll().subscribe((res) => {
      this.expenses = res.data || [];
    });
  }

  goToAdd(): void {
    this.router.navigate(['/expenses/add']);
  }

  edit(id: string): void {
    this.router.navigate(['/expenses/edit', id]);
  }

  delete(id: string): void {
    if (confirm('Are you sure?')) {
      this.expenseService.delete(id).subscribe(() => this.fetchExpenses());
    }
  }
}
