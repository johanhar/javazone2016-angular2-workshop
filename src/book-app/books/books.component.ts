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
                <tr *ngFor="let book of books" [book-row]="book" (click)="bookSelected(book)"></tr>
            </tbody>
        </table>
    `
})
export class Books {
    books: [Book] = BOOK_DATA;

    bookSelected(book: Book) {
        console.log(book);
    }
}