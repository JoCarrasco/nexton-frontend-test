import { Component, effect, output, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  imports: [],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.scss'
})
export class Searchbar {
  searchTerm: WritableSignal<string> = signal('');
  debouncedSearchTerm: WritableSignal<string> = signal('');
  onSearch = output<string>();


  constructor() {
    // This effect runs whenever the 'searchTerm' signal changes
    effect((onCleanup) => {
      const currentSearchValue = this.searchTerm();

      const timeout = setTimeout(() => {
        // This line updates the debounced signal after the delay
        this.debouncedSearchTerm.set(currentSearchValue);
        // Emit the debounced search term
        this.onSearch.emit(currentSearchValue);
        console.log('Debounced search term:', currentSearchValue);
      }, 400); // 400ms debounce time

      // Cleanup function to clear the previous timeout before a new one is set
      onCleanup(() => {
        clearTimeout(timeout);
      });
    }, { allowSignalWrites: true });
  }

  onSearchInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm.set(inputElement.value);
  }
}
