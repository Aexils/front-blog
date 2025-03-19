import {Component} from '@angular/core';
import {UserPreferencesComponent} from './components/header/user-preferences/user-preferences.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserPreferencesComponent, UserPreferencesComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

}
