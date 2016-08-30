import { Component } from '@angular/core';
import {BookRow} from "./book-row.component";
import {Book} from "./book.model";
import {BOOK_DATA} from "../services/book.data";

@Component({
    // Oppgave 5.2 legg til providers-attribute her.
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
    // Oppgave 5.2. Du må legge til constructor med injisert BookService
    books: [Book] = BOOK_DATA;

    bookSelected(book: Book) {
        console.log(book);
    }
}