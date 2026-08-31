import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
    title: 'Leaseweb — Dedicated servers',
  },
  {
    path: 'servers',
    loadComponent: () => import('./pages/catalog/catalog.page').then((m) => m.CatalogPage),
    title: 'Product list — Leaseweb',
  },
  {
    path: 'configure/:sku',
    loadComponent: () => import('./pages/configurator/configurator.page').then((m) => m.ConfiguratorPage),
    title: 'Product detail — Leaseweb',
  },
  {
    path: 'quote',
    loadComponent: () => import('./pages/quote/quote.page').then((m) => m.QuotePage),
    title: 'B2B quote — Leaseweb',
  },
  { path: '**', redirectTo: '' },
];
