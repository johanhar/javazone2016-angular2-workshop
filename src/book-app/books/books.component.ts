import { Component } from '@angular/core';
import { BookList } from './book-list.component';

@Component({
    'selector': 'books',
    'directives': [BookList],
    'template': `
        <book-list></book-list>
    `
})
export class Books {}