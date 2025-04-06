import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InvestmentService } from '../../../services/investment.service';

@Component({
  standalone: true,
  selector: 'app-investment-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './investment-form.component.html',
  styleUrls: ['./investment-form.component.scss'],
})
export class InvestmentFormComponent implements OnInit {
  investmentForm!: FormGroup;
  editingId: string | null = null;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private investmentService: InvestmentService
  ) {}

  ngOnInit(): void {
    this.investmentForm = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      amountInvested: [0, Validators.required],
      currentValue: [0, Validators.required],
      startDate: ['', Validators.required],
    });

    this.editingId = this.route.snapshot.paramMap.get('id');

    if (this.editingId) {
      this.loading = true;
      this.investmentService.getAll().subscribe((res) => {
        const item = res.data.find((inv: any) => inv._id === this.editingId);
        if (item) {
          this.investmentForm.patchValue({
            type: item.type,
            name: item.name,
            amountInvested: item.amountInvested,
            currentValue: item.currentValue,
            startDate: item.startDate?.substring(0, 10),
          });
        }
        this.loading = false;
      });
    }
  }

  submit(): void {
    const form = this.investmentForm.value;
    if (this.investmentForm.invalid) return;

    const request$ = this.editingId
      ? this.investmentService.update(
          this.editingId,
          form.type,
          form.name,
          form.amountInvested,
          form.currentValue,
          form.startDate
        )
      : this.investmentService.create(
          form.type,
          form.name,
          form.amountInvested,
          form.currentValue,
          form.startDate
        );

    request$.subscribe(() => this.router.navigate(['/investments']));
  }

  cancel(): void {
    this.router.navigate(['/investments']);
  }
}
