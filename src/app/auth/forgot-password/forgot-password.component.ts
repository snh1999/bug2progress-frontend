import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../index';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, tap } from 'rxjs';
import { SnackbarService } from 'src/app/material/snackbar.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../auth-template/auth-template.common.css'],
})
export class ForgotPasswordComponent {
  form: FormGroup;
  email: string;
  isError: boolean;

  constructor(
    private authService: AuthService,
    private snackbar: SnackbarService
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.email = '';
    this.isError = false;
  }

  forgotPassword() {
    this.email = this.form.get('email')?.value;

    this.authService
      .forgotPassword(this.email)
      .pipe(
        tap((data) => {
          this.snackbar.openFailureSnackBar('INSERT');
          // this.utils.goToPage();
          // this.toastr.info(data);
          // this.router.navigate(['/']);
        }),
        catchError((error) => {
          this.isError = true;
          this.snackbar.openFailureSnackBar(
            error.error.detail + '. Please Try again'
          );
          return of(error);
        })
      )
      .subscribe();
  }
}
