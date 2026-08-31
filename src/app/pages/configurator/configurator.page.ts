import { Component, computed, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product, ServerConfig } from '../../core/models/infrastructure.model';
import { EurPipe } from '../../core/pipes/eur.pipe';
import { defaultConfig, monthlyPrice } from '../../core/pricing/price';
import { CatalogService } from '../../core/services/catalog.service';
import { QuoteService } from '../../core/services/quote.service';

@Component({
  selector: 'app-configurator-page',
  imports: [RouterLink, EurPipe],
  templateUrl: './configurator.page.html',
  styles: [':host { display: block; }'],
})
export class ConfiguratorPage {
  private readonly router = inject(Router);
  readonly catalog = inject(CatalogService);
  readonly quote = inject(QuoteService);
  readonly sku = input<string>();

  readonly product = signal<Product | null>(null);
  readonly config = signal<ServerConfig | null>(null);

  readonly price = computed(() => {
    const product = this.product();
    const config = this.config();
    return product && config ? monthlyPrice(product, config) : 0;
  });

  readonly availableLocations = computed(() => {
    const product = this.product();
    if (!product) {
      return [];
    }
    return this.catalog.locations().filter((location) => product.locations.includes(location.id));
  });

  constructor() {
    toObservable(this.sku)
      .pipe(
        switchMap((code) => this.catalog.product$(code ?? null)),
        takeUntilDestroyed()
      )
      .subscribe((found) => {
        if (this.catalog.status() !== 'ready') {
          this.product.set(null);
          this.config.set(null);
          return;
        }
        if (!found) {
          void this.router.navigate(['/servers']);
          return;
        }
        this.product.set(found);
        this.config.set(defaultConfig(found));
      });
  }

  patch(partial: Partial<ServerConfig>): void {
    this.config.update((current) => (current ? { ...current, ...partial } : current));
  }

  requestQuote(): void {
    const product = this.product();
    const config = this.config();
    if (!product || !config) {
      return;
    }
    this.quote.save(product, config);
    void this.router.navigate(['/quote']);
  }
}
