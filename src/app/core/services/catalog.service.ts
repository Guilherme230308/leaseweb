import { Injectable, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, filter, map } from 'rxjs';
import { OccProductAdapter } from '../occ/occ-product.adapter';
import { Product } from '../models/infrastructure.model';
import { defaultConfig, monthlyPrice } from '../pricing/price';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly adapter = inject(OccProductAdapter);
  private readonly catalog = toSignal(this.adapter.load(), {
    initialValue: { products: [], locations: [], status: 'loading' as const },
  });

  readonly locationFilter = signal('');

  readonly products = computed(() => this.catalog().products);
  readonly locations = computed(() => this.catalog().locations);
  readonly status = computed(() => this.catalog().status);

  readonly filtered = computed(() => {
    const location = this.locationFilter();
    return this.products().filter((product) => !location || product.locations.includes(location));
  });

  productById(id: string): Product | undefined {
    return this.products().find((item) => item.id === id);
  }

  product$(code: string | null): Observable<Product | undefined> {
    return this.adapter.load().pipe(
      filter((catalog) => catalog.status !== 'loading'),
      map((catalog) => catalog.products.find((item) => item.id === code))
    );
  }

  locationById(id: string) {
    return this.locations().find((item) => item.id === id);
  }

  startingPrice(product: Product): number {
    return monthlyPrice(product, defaultConfig(product));
  }

  retry(): void {
    this.adapter.retry();
  }
}
