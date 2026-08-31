import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styles: [':host { display: block; }'],
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}
