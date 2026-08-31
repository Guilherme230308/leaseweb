import { Pipe, PipeTransform } from '@angular/core';
import { formatEur } from '../utils/format';

@Pipe({ name: 'eur', standalone: true })
export class EurPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value == null || Number.isNaN(value)) {
      return formatEur(0);
    }
    return formatEur(value);
  }
}
