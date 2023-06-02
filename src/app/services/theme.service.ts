import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _darkThemeSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public darkTheme$ = this._darkThemeSubject.asObservable();

  setDarkTheme(isDarkTheme: boolean): void {
    this._darkThemeSubject.next(isDarkTheme);
  }

  activeTheme: string = 'light';

  toggleTheme() {
    this.activeTheme = this.activeTheme === 'light' ? 'dark' : 'light';
  }
}
