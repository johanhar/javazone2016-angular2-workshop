import {Component, EventEmitter, Output} from '@angular/core';
import {BookService} from "../services/book.service";
import {Book} from "../books/book.model";

@Component({
    'providers': [BookService],
    'selector': 'search',
    'template': `<input  class="search" type="text" #key (keyup)="search(key.value)" placeholder="Search">`
})
export class SearchComponent {

    // Oppgave 7.1 legg til en event her som heter 'onSearchResult'
    // https://angular.io/docs/ts/latest/api/core/index/EventEmitter-class.html
    // @Output()...

    // Angular injects BookService automatisk.
    constructor(private bookService: BookService) {
    }

    search(searchKey:string):void {
        if (searchKey.length > 2) {
            this.bookService.search(searchKey).subscribe((result) => {
                console.log(`Searching with ${searchKey} resulting ${result}`);
                // Oppgave 7.2 Vi har resultat og vi må sende (emit) den her!
            });
        } else {
            console.log("Clearing searchfield.");
            // Oppgave 7.2 Her skal vi sende ut en tom Array.
        }
    }
}