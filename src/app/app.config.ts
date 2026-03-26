import {
  ApplicationConfig,
  EnvironmentProviders,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners
} from '@angular/core';
import {provideRouter, Router} from '@angular/router';

import {routes} from './app.routes';
import {providePrimeNG} from "primeng/config";
import Aura from '@primeuix/themes/aura';
import {HttpEvent, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors} from '@angular/common/http';
import {catchError, firstValueFrom, Observable, retry, throwError} from 'rxjs';
import {provideTranslateService} from '@ngx-translate/core';
import {provideTranslateHttpLoader} from '@ngx-translate/http-loader';
import {MessageService} from 'primeng/api';
import {PluginService} from 'app/core/services/plugin.service';
import {Plugin} from 'app/core/model/plugin';
import {PLUGIN_REGISTRY} from 'app/plugin-registry';

function errorHandlerInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((e) => {
      messageService.add({severity: 'error', summary: 'Error', detail: e.error.message});
      return throwError(() => e);
    })
  );
}

export function providePluginRoutes(): EnvironmentProviders {
  return provideAppInitializer(() => {
    const pluginService = inject(PluginService);
    const router = inject(Router);

    return firstValueFrom(
      pluginService.getPlugins().pipe(
        retry({ count: 3, delay: 1000 })
      )
    )
      .then(buildRoutes(router))
      .catch(err => {
        throw err;
      });
  });
}

function buildRoutes(router: Router) {
  return (plugins: Plugin[]) => {
    const pluginRoutes = plugins
      .filter(p => PLUGIN_REGISTRY[p.path])
      .map(p => ({
        path: p.path,
        loadComponent: PLUGIN_REGISTRY[p.path],
        data: { title: p.description }
      }));

    router.resetConfig([
      { path: '', redirectTo: plugins[0]?.path ?? 'dashboard', pathMatch: 'full' },
      ...pluginRoutes,
      { path: '**', redirectTo: plugins[0]?.path ?? 'dashboard' }
    ]);
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePluginRoutes(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    provideHttpClient(
      withInterceptors([errorHandlerInterceptor])
    ),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: './i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'it-IT',
      lang: 'it-IT'
    }),
    MessageService,
  ]
};
