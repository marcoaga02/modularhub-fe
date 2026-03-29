import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TopbarComponent} from 'app/core/layout/topbar/topbar.component';
import {SidebarComponent} from 'app/core/layout/sidebar/sidebar.component';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {Toast} from 'primeng/toast';
import {ConfirmationService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopbarComponent, SidebarComponent, ConfirmDialog, Toast],
  providers: [DialogService, ConfirmationService],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('modularhub-fe-temp');
}
