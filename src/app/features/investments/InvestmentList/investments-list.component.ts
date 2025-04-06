import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { InvestmentService } from '../../../services/investment.service';

@Component({
  standalone: true,
  selector: 'app-investments-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './investments-list.component.html',
  styleUrls: ['./investments-list.component.scss'],
})
export class InvestmentsListComponent implements OnInit {
  investments: any[] = [];

  constructor(
    private investmentService: InvestmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchInvestments();
  }

  fetchInvestments(): void {
    this.investmentService.getAll().subscribe((res) => {
      this.investments = res.data || [];
    });
  }

  goToAdd(): void {
    this.router.navigate(['/investments/add']);
  }

  edit(id: string): void {
    this.router.navigate(['/investments/edit', id]);
  }

  delete(id: string): void {
    if (confirm('Are you sure?')) {
      this.investmentService
        .delete(id)
        .subscribe(() => this.fetchInvestments());
    }
  }
}
