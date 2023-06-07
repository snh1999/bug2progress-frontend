import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-template',
  templateUrl: './auth-template.component.html',
  styleUrls: ['./auth-template.common.css'],
})
export class AuthTemplateComponent {
  @Input()
  title: string = '';
  @Input()
  title_icon: string = '';
}
