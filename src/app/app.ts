import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TopbarComponent} from 'app/core/layout/topbar/topbar.component';
import {SidebarComponent} from 'app/core/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopbarComponent, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('modularhub-fe-temp');
}
