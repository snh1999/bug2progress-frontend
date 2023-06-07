import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PageComponent } from './page/page.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [SidebarComponent, PageComponent],
  imports: [CommonModule, MaterialModule],
  exports: [SidebarComponent, PageComponent],
})
export class DashboardModule {}
