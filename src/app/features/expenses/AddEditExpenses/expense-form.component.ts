import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../../services/expense.service';

@Component({
  standalone: true,
  selector: 'app-expense-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss'],
})
export class ExpenseFormComponent implements OnInit {
  expensesForm!: FormGroup;
  editingId: string | null = null;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private expensesService: ExpenseService
  ) {}

  ngOnInit(): void {
    this.expensesForm = this.fb.group({
      amount: ['', Validators.required],
      category: ['', Validators.required],
      note: ['', Validators.required],
    });

    this.editingId = this.route.snapshot.paramMap.get('id');

    if (this.editingId) {
      this.loading = true;
      this.expensesService.getAll().subscribe((res) => {
        const item = res.data.find((inv: any) => inv._id === this.editingId);
        if (item) {
          this.expensesForm.patchValue({
            amount: item.amount,
            category: item.category,
            note: item.note,
          });
        }
        this.loading = false;
      });
    }
  }

  submit(): void {
    const form = this.expensesForm.value;
    if (this.expensesForm.invalid) return;

    const request$ = this.editingId
      ? this.expensesService.update(
          this.editingId,
          form.amount,
          form.category,
          form.note
        )
      : this.expensesService.create(form.amount, form.category, form.note);

    request$.subscribe(() => this.router.navigate(['/expenses']));
  }

  cancel(): void {
    this.router.navigate(['/expenses']);
  }
}
