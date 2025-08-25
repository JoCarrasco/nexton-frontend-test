import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 50, trail: string = '...'): string {
    if (!value) {
      return '';
    }

    // First, replace newlines with a space to make it a single line
    const singleLineValue = value.replace(/\n/g, ' ');

    return singleLineValue.length > limit 
      ? singleLineValue.substring(0, limit) + trail 
      : singleLineValue;
  }
}
