import { Component, output } from '@angular/core';

@Component({
  selector: 'app-search-filters',
  imports: [],
  templateUrl: './search-filters.html',
  styleUrl: './search-filters.scss'
})
export class SearchFilters {
  onFilterChange = output<Event>();
  onSortChange = output<Event>();

}
