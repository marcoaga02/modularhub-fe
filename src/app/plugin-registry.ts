import { Route } from '@angular/router';

export const PLUGIN_REGISTRY: Record<string, Route['loadComponent']> = {
  // TODO rimuovere/aggiornare home ed aggiungere gli altri plugin
  'home': () =>
    import('app/modules/home-page-placeholder/home-page-placeholder.component')
      .then(m => m.HomePagePlaceholderComponent),
};
