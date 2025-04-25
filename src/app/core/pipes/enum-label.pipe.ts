import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumLabel',
})
export class EnumLabelPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    return value
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
