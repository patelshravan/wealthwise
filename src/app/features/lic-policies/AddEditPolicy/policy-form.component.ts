import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PolicyService } from '../../../services/policy.service';

@Component({
  standalone: true,
  selector: 'app-policy-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './policy-form.component.html',
  styleUrls: ['./policy-form.component.scss'],
})
export class PolicyFormComponent implements OnInit {
  policyForm!: FormGroup;
  editingId: string | null = null;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private policyService: PolicyService
  ) {}

  ngOnInit(): void {
    this.policyForm = this.fb.group({
      policyNumber: [0, Validators.required],
      policyName: ['', Validators.required],
      premiumAmount: [0, Validators.required],
      dueDate: ['', Validators.required],
      maturityDate: ['', Validators.required],
    });

    this.editingId = this.route.snapshot.paramMap.get('id');

    if (this.editingId) {
      this.loading = true;
      this.policyService.getAll().subscribe((res) => {
        const item = res.data.find((inv: any) => inv._id === this.editingId);
        if (item) {
          this.policyForm.patchValue({
            policyNumber: item.policyNumber,
            policyName: item.policyName,
            premiumAmount: item.premiumAmount,
            dueDate: item.dueDate?.substring(0, 10),
            maturityDate: item.maturityDate?.substring(0, 10),
          });
        }
        this.loading = false;
      });
    }
  }

  submit(): void {
    const form = this.policyForm.value;
    if (this.policyForm.invalid) return;

    const request$ = this.editingId
      ? this.policyService.update(
          this.editingId,
          form.policyNumber,
          form.policyName,
          form.premiumAmount,
          form.dueDate,
          form.maturityDate
        )
      : this.policyService.create(
          form.policyNumber,
          form.policyName,
          form.premiumAmount,
          form.dueDate,
          form.maturityDate
        );

    request$.subscribe(() => this.router.navigate(['/policies']));
  }

  cancel(): void {
    this.router.navigate(['/policies']);
  }
}
