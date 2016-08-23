import {Component,OnInit, EventEmitter, Output} from '@angular/core';
import {BookService} from "../services/book.service";
import {Book} from "../books/book.model";

@Component({
    'providers': [BookService],
    'selector': 'search',
    'template': `<input type="text" #key (keyup)="search(key.value)" placeholder="Search">`
})
export class SearchComponent {

    @Output() onSearchResult:EventEmitter<Book[]> = new EventEmitter<Book[]>();

    constructor(private bookService: BookService) {
    }

    search(searchKey:string):void {
        if (searchKey.length > 2) {
            this.bookService.search(searchKey).subscribe((result) => {
                console.log(`Searching with ${searchKey} resulting ${result}`);
                this.onSearchResult.emit(result);
            });
        } else {
            console.log("Clearing searchfield.");
            this.onSearchResult.emit([]);
        }
    }
}