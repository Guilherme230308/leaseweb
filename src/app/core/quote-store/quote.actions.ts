import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { QuoteItem } from '../models/infrastructure.model';

export const QuoteActions = createActionGroup({
  source: 'Quote',
  events: {
    'Add Quote': props<{ item: QuoteItem }>(),
    'Clear Quote': emptyProps(),
  },
});
