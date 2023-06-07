import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-links',
  template: `
    <div class="input-wrapper center-align" style="margin-top: 20px;">
      {{ additionalText }}
      <a mat-stroked-button href="{{ path }}"
        >{{ buttonText }}<mat-icon>{{ logoText }}</mat-icon></a
      >
    </div>
  `,
  styleUrls: ['./auth-template.common.css'],
})
export class BottomLinksComponent implements OnInit {
  @Input()
  selection: string = '';
  additionalText: string = '';
  path: string = '';
  buttonText: string = '';
  logoText: string = '';

  ngOnInit(): void {
    if (this.selection == 'login') {
      this.additionalText = 'Already a member? ';
      this.path = '/login';
      this.buttonText = 'Login';
      this.logoText = 'login';
    } else if (this.selection == 'register') {
      this.additionalText = 'New here? ';
      this.path = '/register';
      this.buttonText = 'Register';
      this.logoText = 'app_registration';
    } else if (this.selection == 'password') {
      this.additionalText = 'Forgot Password';
      this.path = '/forgot-password';
      this.buttonText = 'Click Here';
      this.logoText = 'open_in_new';
    }
  }
}
