import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginReqPayload } from '../dto/login.dto';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    '../auth-template/auth-template.common.css',
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  loginReqPayload: LoginReqPayload;
  passwordHide: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.loginReqPayload = {
      email: '',
      password: '',
    };
    this.passwordHide = true;
  }

  loginUser() {
    this.authService.login(this.loginReqPayload).subscribe((response: any) => {
      // Store the token in local storage
      localStorage.setItem('token', response.token);

      // Redirect the user to the homepage
      this.router.navigate(['/home']);
    });
  }

  login() {
    this.loginReqPayload.email = this.loginForm.get('email')?.value;
    this.loginReqPayload.password = this.loginForm.get('password')?.value;

    this.authService.login(this.loginReqPayload).subscribe((data) => {
      console.log('Login Successful');
    });

    this.authService
      .login(this.loginReqPayload)
      .pipe(
        tap((data) => {
          this.toastr.success(data);
          this.toastr.info(data);
          this.router.navigate(['/']);
        }),
        catchError((error) => {
          this.toastr.error(error.error.detail + '. Please Try again');
          return of(error);
        })
      )
      .subscribe();
  }
  getErrorMessage() {
    return this.loginForm.hasError('required') ? 'You must enter a value' : '';
  }
}
