import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EurPipe } from '../../core/pipes/eur.pipe';
import { QuoteService } from '../../core/services/quote.service';

@Component({
  selector: 'app-quote-page',
  imports: [ReactiveFormsModule, RouterLink, EurPipe],
  templateUrl: './quote.page.html',
  styles: [':host { display: block; }'],
})
export class QuotePage {
  readonly quote = inject(QuoteService);
  private readonly fb = inject(FormBuilder);
  readonly submitted = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    company: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  submit(): void {
    if (this.form.invalid || !this.quote.item()) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.set(`LW-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
  }
}
