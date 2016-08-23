import { Component, Input } from '@angular/core';
import { Book } from './book.model';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    'selector': 'tr[book-row]',
    'template': `
        <td><a [routerLink]="['/books', book.id]">{{book.title}}</a></td>
        <td>{{book.author}}</td>
        <td>{{book.isbn}}</td>
    `
})
export class BookRow {
    @Input('book-row') book: Book;
}