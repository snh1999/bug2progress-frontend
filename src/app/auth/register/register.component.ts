import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RegisterReqPayload } from '../dto/register.payload';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerReqPayload: RegisterReqPayload;
  registerForm: FormGroup;

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
