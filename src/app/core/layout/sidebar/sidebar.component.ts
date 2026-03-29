import {Component} from '@angular/core';
import {NgClass} from '@angular/common';
import {Button} from 'primeng/button';
import {PluginService} from 'app/core/services/plugin.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Plugin} from 'app/core/model/plugin';
import {Router} from '@angular/router';
import {Tooltip} from 'primeng/tooltip';

@Component({
  selector: 'app-sidebar',
  imports: [
    NgClass,
    Button,
    Tooltip
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {

  protected isOpen: boolean = false;
  protected loading: boolean = true;
  protected plugins: Plugin[] = [];

  constructor(
    private readonly pluginService: PluginService,
    private readonly router: Router,
  ) {
    this.pluginService.getPlugins().pipe(takeUntilDestroyed()).subscribe({
      next: plugins => {
        if (!plugins || plugins.length === 0) {
          return;
        }

        this.plugins = plugins;
        this.loading = false;
      },
      error: err => {

      }
    })
  }


  protected toggle() {
    this.isOpen = !this.isOpen;
  }

  private close() {
    if (!this.isOpen) {
      return;
    }

    this.toggle();
  }

  protected navigate(path: string) {
    this.close();
    this.router.navigate([path]);
  }
}
