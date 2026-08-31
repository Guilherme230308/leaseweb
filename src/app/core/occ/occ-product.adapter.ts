import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { Location, Product } from '../models/infrastructure.model';
import { mapOccCatalog } from './occ.mapper';
import { OccProductSearchPage } from './occ.models';

export interface StorefrontCatalog {
  products: Product[];
  locations: Location[];
}

@Injectable({ providedIn: 'root' })
export class OccProductAdapter {
  private readonly http = inject(HttpClient);
  private readonly catalog$ = this.http
    .get<OccProductSearchPage>('assets/occ/products.json')
    .pipe(map(mapOccCatalog), shareReplay(1));

  load(): Observable<StorefrontCatalog> {
    return this.catalog$;
  }
}
