import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './logo/logo.component';
import { MaterialModule } from '../material/material.module';

const components = [HeaderComponent, LogoComponent];

@NgModule({
  declarations: [HeaderComponent, LogoComponent],
  imports: [MaterialModule],
  exports: [HeaderComponent, LogoComponent],
})
export class ComponentsModule {}
