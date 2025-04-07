import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SavingService } from '../../../services/savings.service';

@Component({
  standalone: true,
  selector: 'app-investments-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './savings-list.component.html',
  styleUrls: ['./savings-list.component.scss'],
})
export class SavingListComponent implements OnInit {
  savings: any[] = [];

  constructor(private savingService: SavingService, private router: Router) {}

  ngOnInit(): void {
    this.fetchsavings();
  }

  fetchsavings(): void {
    this.savingService.getAll().subscribe((res) => {
      this.savings = res.data || [];
    });
  }

  goToAdd(): void {
    this.router.navigate(['/savings/add']);
  }

  edit(id: string): void {
    this.router.navigate(['/savings/edit', id]);
  }

  delete(id: string): void {
    if (confirm('Are you sure?')) {
      this.savingService.delete(id).subscribe(() => this.fetchsavings());
    }
  }
}
