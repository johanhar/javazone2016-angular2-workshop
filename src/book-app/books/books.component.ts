import { Component } from '@angular/core';
import { BookRow } from './book-row.component';
import { BOOK_DATA } from './book.data';
import { Book } from './book.model';

@Component({
    'selector': 'books',
    'directives': [BookRow],
    'template': `
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>ISBN</th>
                </tr>
            </thead>
            <tbody>
                <!-- snart lager vi en NgFor her istedenfor -->
                <tr book-row></tr>
                <tr book-row></tr>
                <tr book-row></tr>
                <tr book-row></tr>
            </tbody>
        </table>
        <p *ngFor="let book of books">{{book.title}}</p>
    `
})
export class Books {
    // foreløpig tom

    books: [Book] = BOOK_DATA

    ngOnInit(): void {
        console.log(BOOK_DATA);
    }
}