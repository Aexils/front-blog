import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { authStore } from '../../../stores/auth.store';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-menu.component.html',
})
export class UserMenuComponent {
  private router = inject(Router);

  showMenu = signal(false);
  isLoggedIn = authStore.isLoggedIn;

  theme = signal<'light' | 'dark'>(
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );

  toggleMenu() {
    this.showMenu.update((v) => !v);
  }

  toggleTheme() {
    const newTheme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
    this.showMenu.set(false);
  }

  logout() {
    authStore.logout();
    this.router.navigate(['/login']);
    this.showMenu.set(false);
  }
}
