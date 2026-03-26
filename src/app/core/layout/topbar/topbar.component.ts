import {Component} from '@angular/core';
import {Toolbar} from 'primeng/toolbar';
import {PluginService} from 'app/core/services/plugin.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {NavigationEnd, Router} from '@angular/router';
import {Plugin} from 'app/core/model/plugin';
import {filter} from 'rxjs';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-topbar',
  imports: [
    Toolbar,
    Button
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {

  protected loading: boolean = true;
  protected plugins: Plugin[] = [];
  protected currentPlugin?: Plugin;

  constructor(
    private readonly pluginService: PluginService,
    private readonly router: Router
  ) {
    this.pluginService.getPlugins()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: plugins => {
          if (!plugins || plugins.length === 0) {
            return;
          }

          this.plugins = plugins;
          this.updateCurrentPlugin();
          this.loading = false;
        },
        error: () => {
        }
      });

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.updateCurrentPlugin();
      });
  }

  private updateCurrentPlugin() {
    const url = this.router.url.split('/')[1];

    this.currentPlugin = this.plugins.find((p) => p.path === url);
  }

}
