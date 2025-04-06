import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {authStore} from './stores/auth.store';
import {NavbarComponent} from './components/header/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  protected readonly authStore = authStore;
}
