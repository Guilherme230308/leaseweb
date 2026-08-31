import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../../core/services/catalog.service';
import { ProductCardComponent } from '../../shared/product-card.component';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './home.page.html',
  styles: [':host { display: block; }'],
})
export class HomePage {
  readonly catalog = inject(CatalogService);
}
