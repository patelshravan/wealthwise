import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PolicyService } from '../../../services/policy.service';

@Component({
  standalone: true,
  selector: 'app-policy-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.scss'],
})
export class PolicyListComponent implements OnInit {
  policies: any[] = [];

  constructor(
    private policyService: PolicyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchpolicies();
  }

  fetchpolicies(): void {
    this.policyService.getAll().subscribe((res) => {
      this.policies = res.data || [];
    });
  }

  goToAdd(): void {
    this.router.navigate(['/policies/add']);
  }

  edit(id: string): void {
    this.router.navigate(['/policies/edit', id]);
  }

  delete(id: string): void {
    if (confirm('Are you sure?')) {
      this.policyService
        .delete(id)
        .subscribe(() => this.fetchpolicies());
    }
  }
}
