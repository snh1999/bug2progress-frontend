import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent, RegisterComponent } from './auth';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
