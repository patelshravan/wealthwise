import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../components/custom-snackbar/custom-snackbar.component';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string) {
    this.show(message, 'success');
  }

  showError(message: string) {
    this.show(message, 'error');
  }

  private show(message: string, type: 'success' | 'error') {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: { message, type },
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
