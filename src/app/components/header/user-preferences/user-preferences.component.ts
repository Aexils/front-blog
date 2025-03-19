import { Component, OnInit, signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StorageService } from '../../../services/storage.service';

interface UserPreferencesInterface {
  theme: string;
  language: string;
}

@Component({
  selector: 'app-user-preferences',
  imports: [],
  standalone: true,
  templateUrl: './user-preferences.component.html',
})
export class UserPreferencesComponent implements OnInit {
  theme = signal('dark');
  private readonly DEFAULT_PREFERENCES: UserPreferencesInterface = {
    theme: this.theme(),
    language: 'french'
  };

  preferences: UserPreferencesInterface = { ...this.DEFAULT_PREFERENCES };

  private readonly STORAGE_KEY = 'user_preferences';

  constructor(private storageService: StorageService, @Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit(): void {
    this.getPreferences();
  }

  getPreferences(): void {
    const savedPrefs = this.storageService.getItem<UserPreferencesInterface>(this.STORAGE_KEY);

    if (savedPrefs) {
      // @ts-ignore
      this.preferences = { ...this.DEFAULT_PREFERENCES, ...savedPrefs };
    }

    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.classList.toggle(
        "dark",
        this.preferences.theme === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
  }

  switchingTheme(theme: string): void {
    this.theme.set(theme);
    this.preferences.theme = theme;

    if (isPlatformBrowser(this.platformId))
      this.preferences.theme === 'dark' ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');

    this.savePreferences();
  }

  savePreferences(): void {
    this.storageService.setItem(this.STORAGE_KEY, this.preferences);
  }
}
