import {Component, EventEmitter, Output} from '@angular/core';
import {BookService} from "../services/book.service";
import {Book} from "../books/book.model";

@Component({
    'providers': [BookService],
    'selector': 'search',
    'template': `<input  class="search" type="text" #key (keyup)="search(key.value)" placeholder="Search">`
})
export class SearchComponent {

    // Oppgave 7.1 legg til en event her
    @Output() onSearchResult:EventEmitter<Book[]> = new EventEmitter<Book[]>();

    // Angular injects BookService automatisk.
    constructor(private bookService: BookService) {
    }

    search(searchKey:string):void {
        if (searchKey.length > 2) {
            this.bookService.search(searchKey).subscribe((result) => {
                console.log(`Searching with ${searchKey} resulting ${result}`);
                // Oppgave 7.1 Vi har resultat og vi må sende (emit) den her!
                this.onSearchResult.emit(result);
            });
        } else {
            console.log("Clearing searchfield.");
            // Oppgave 7.1 Her skal vi sende ut en tom Array.
            this.onSearchResult.emit([]);
        }
    }
}