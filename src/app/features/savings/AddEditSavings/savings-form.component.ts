import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SavingService } from '../../../services/savings';

@Component({
  standalone: true,
  selector: 'app-saving-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './savings-form.component.html',
  styleUrls: ['./savings-form.component.scss'],
})
export class SavingFormComponent implements OnInit {
  savingForm!: FormGroup;
  editingId: string | null = null;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private savingService: SavingService
  ) {}

  ngOnInit(): void {
    this.savingForm = this.fb.group({
      amount: ['', Validators.required],
      note: ['', Validators.required],
    });

    this.editingId = this.route.snapshot.paramMap.get('id');

    if (this.editingId) {
      this.loading = true;
      this.savingService.getAll().subscribe((res) => {
        const item = res.data.find((inv: any) => inv._id === this.editingId);
        if (item) {
          this.savingForm.patchValue({
            amount: item.amount,
            note: item.note,
          });
        }
        this.loading = false;
      });
    }
  }

  submit(): void {
    const form = this.savingForm.value;
    if (this.savingForm.invalid) return;

    const request$ = this.editingId
      ? this.savingService.update(this.editingId, form.type, form.name)
      : this.savingService.create(form.amount, form.note);

    request$.subscribe(() => this.router.navigate(['/savings']));
  }

  cancel(): void {
    this.router.navigate(['/savings']);
  }
}
