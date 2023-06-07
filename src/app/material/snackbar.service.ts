import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  success_style = 'green-snackbar';
  failure_style = 'red-snackbar';
  constructor(private snackbar: MatSnackBar) {}

  openSnackBar(message: string, style: string[], action: string) {
    this.snackbar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: style,
    });
  }

  openSuccessSnackBar(message: string, action: string = 'OK') {
    this.openSnackBar(message, [this.success_style], action);
  }

  openFailureSnackBar(message: string, action: string = 'Dismiss') {
    this.openSnackBar(message, [this.failure_style], action);
  }
}
