import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../core/models/infrastructure.model';
import { EurPipe } from '../core/pipes/eur.pipe';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, EurPipe],
  templateUrl: './product-card.component.html',
  styles: [':host { display: block; height: 100%; }'],
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
  readonly price = input.required<number>();
}
