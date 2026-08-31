import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product, QuoteItem, ServerConfig } from '../models/infrastructure.model';
import { configSummary, monthlyPrice } from '../pricing/price';
import { CatalogService } from './catalog.service';
import { QuoteActions } from '../quote-store/quote.actions';
import { quoteFeature } from '../quote-store/quote.reducer';

@Injectable({ providedIn: 'root' })
export class QuoteService {
  private readonly store = inject(Store);
  private readonly catalog = inject(CatalogService);

  readonly item = this.store.selectSignal(quoteFeature.selectItem);

  save(product: Product, config: ServerConfig): void {
    const location = this.catalog.locationById(config.locationId);
    const item: QuoteItem = {
      productName: product.name,
      locationLabel: location ? `${location.city} (${location.id})` : config.locationId,
      summary: configSummary(config, this.catalog.locations()),
      monthlyPrice: monthlyPrice(product, config),
      config,
    };
    this.store.dispatch(QuoteActions.addQuote({ item }));
  }

  clear(): void {
    this.store.dispatch(QuoteActions.clearQuote());
  }
}
