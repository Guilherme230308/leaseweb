import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
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
export class ConfiguratorPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly catalog = inject(CatalogService);
  readonly quote = inject(QuoteService);

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

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('sku')),
        switchMap((sku) => this.catalog.product$(sku))
      )
      .subscribe((found) => {
        if (!found) {
          if (this.catalog.products().length) {
            void this.router.navigate(['/servers']);
          }
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
