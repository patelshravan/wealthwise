import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-snackbar',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.scss'],
})
export class CustomSnackbarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public data: { message: string; type: 'success' | 'error' }
  ) {}
}
