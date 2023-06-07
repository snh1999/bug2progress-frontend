import { Component } from '@angular/core';
import { StyleManager } from 'src/app/services/style-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isDarkTheme = this.styleManager.isDark;

  constructor(private styleManager: StyleManager) {}

  toggleTheme() {
    this.styleManager.toggleDarkTheme();
    this.isDarkTheme = !this.isDarkTheme;
    console.log(this.isDarkTheme);
  }
}
