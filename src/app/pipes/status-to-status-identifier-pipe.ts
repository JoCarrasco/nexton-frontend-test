import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusToStatusIdentifier',
  standalone: true
})
export class StatusToStatusIdentifierPipe implements PipeTransform {
  transform(status: string | undefined): string {
    switch (status) {
      case 'Backlog':
        return 'backlog';
      case 'Pending':
        return 'pending';
      case 'In Progress':
        return 'in-progress';
      case 'In Review':
        return 'in-review';
      case 'Done':
        return 'done';
      default:
        return 'unknown';
    }
  }
}
