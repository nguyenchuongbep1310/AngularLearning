import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true,
})
export class Highlight implements PipeTransform {
  transform(value: string, keyword: string): string {
    if (!keyword) return value;
    const regex = new RegExp(`(${keyword})`, 'gi');
    return value.replace(regex, '<mark>$1</mark>');
  }
}
