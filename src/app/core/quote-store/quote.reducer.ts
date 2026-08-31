import { createFeature, createReducer, on } from '@ngrx/store';
import { QuoteItem } from '../models/infrastructure.model';
import { QuoteActions } from './quote.actions';

export interface QuoteState {
  item: QuoteItem | null;
}

const initialState: QuoteState = { item: null };

const quoteReducer = createReducer(
  initialState,
  on(QuoteActions.addQuote, (_state, { item }): QuoteState => ({ item })),
  on(QuoteActions.clearQuote, (): QuoteState => ({ item: null }))
);

export const quoteFeature = createFeature({
  name: 'quote',
  reducer: quoteReducer,
});
