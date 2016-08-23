import { Component, Input } from '@angular/core';
import { Book } from './book.model';

@Component({
    'selector': 'tr[book-row]',
    'template': `
        <td>{{book.title}}</td>
        <td>{{book.author}}</td>
        <td>{{book.isbn}}</td>
    `
})
export class BookRow {
    @Input('book-row') book: Book;
}