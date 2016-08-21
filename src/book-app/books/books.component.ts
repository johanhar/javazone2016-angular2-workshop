import { Component } from '@angular/core';
import { BookList } from './book-list.component';

@Component({
    'selector': 'books',
    'directives': [BookList],
    'template': `
        <h1>Look at all these books!</h1>
        <book-list></book-list>
    `
})
export class Books {}