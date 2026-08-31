import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject, catchError, map, of, shareReplay, startWith, switchMap } from 'rxjs';
import { Location, Product } from '../models/infrastructure.model';
import { mapOccCatalog } from './occ.mapper';
import { OccProductSearchPage } from './occ.models';

export type CatalogStatus = 'loading' | 'ready' | 'error';

export interface StorefrontCatalog {
  products: Product[];
  locations: Location[];
  status: CatalogStatus;
}

const idleCatalog = (status: CatalogStatus): StorefrontCatalog => ({
  products: [],
  locations: [],
  status,
});

@Injectable({ providedIn: 'root' })
export class OccProductAdapter {
  private readonly http = inject(HttpClient);
  private readonly refresh = new Subject<void>();
  private readonly catalog$ = this.refresh.pipe(
    startWith(undefined),
    switchMap(() =>
      this.http.get<OccProductSearchPage>('assets/occ/products.json').pipe(
        map((page) => ({ ...mapOccCatalog(page), status: 'ready' as const })),
        catchError(() => of(idleCatalog('error'))),
        startWith(idleCatalog('loading'))
      )
    ),
    shareReplay(1)
  );

  load(): Observable<StorefrontCatalog> {
    return this.catalog$;
  }

  retry(): void {
    this.refresh.next();
  }
}
