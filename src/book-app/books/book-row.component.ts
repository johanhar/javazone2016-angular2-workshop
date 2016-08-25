import { Component } from '@angular/core';
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
    book = new Book(1, 'The book title', 'The author', 'ISBN 123', 'Some description');
}