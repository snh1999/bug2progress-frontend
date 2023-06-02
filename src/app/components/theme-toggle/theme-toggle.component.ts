import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css'],
})
export class ThemeToggleComponent implements OnInit {
  isDarkTheme = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.darkTheme$.subscribe((isDarkTheme) => {
      this.isDarkTheme = isDarkTheme;
    });
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeService.setDarkTheme(this.isDarkTheme);
  }
}
