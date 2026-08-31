import { Component, inject } from '@angular/core';
import { CatalogService } from '../../core/services/catalog.service';
import { ProductCardComponent } from '../../shared/product-card.component';

@Component({
  selector: 'app-catalog-page',
  imports: [ProductCardComponent],
  templateUrl: './catalog.page.html',
  styles: [':host { display: block; }'],
})
export class CatalogPage {
  readonly catalog = inject(CatalogService);
}
