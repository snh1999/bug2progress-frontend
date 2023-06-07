import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent, RegisterComponent, ForgotPasswordComponent } from './';
import { MaterialModule } from '../material/material.module';
import { AuthTemplateComponent } from './auth-template/auth-template.component';
import { ComponentsModule } from '../components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BottomLinksComponent } from './auth-template/bottom-links.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthTemplateComponent,
    ForgotPasswordComponent,
    BottomLinksComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  // exports: [LoginComponent, RegisterComponent, ForgotPasswordComponent],
})
export class AuthModule {}
