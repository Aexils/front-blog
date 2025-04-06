import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { authStore } from '../../../stores/auth.store';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, UserMenuComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  isLoggedIn = authStore.isLoggedIn;
}
