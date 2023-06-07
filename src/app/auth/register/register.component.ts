import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RegisterReqPayload } from '../dto/register.dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth-template/auth-template.common.css'],
})
export class RegisterComponent {
  registerReqPayload: RegisterReqPayload;
  registerForm: FormGroup;
  passwordHide: boolean;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.registerReqPayload = {
      email: '',
      password: '',
      name: '',
      username: '',
      country: '',
      photo: '',
    };
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      photo: new FormControl('', Validators.required),
    });

    this.passwordHide = true;
  }
  register() {
    this.registerReqPayload.email = this.registerForm.get('email')?.value;
    this.registerReqPayload.password = this.registerForm.get('password')?.value;
  }

  // registerUser() {
  //   this.authService.register(this.user).subscribe((response: any) => {
  //     // Store the token in local storage
  //     localStorage.setItem('token', response.token);

  //     // Redirect the user to the homepage
  //     this.router.navigate(['/home']);
  //   });
  // }
}
