import { Component, OnInit } from '@angular/core';
import {BookService} from "../services/book.service";

@Component({
    'providers': [BookService],
    'selector': 'about',
    'template': `
        <p>We collect information about books ...</p>
        <p>Currently we have as many as {{ numberOfBooks }} books</p>
    `
})
export class About implements OnInit {

    numberOfBooks: number = 0;

    constructor(private bookService: BookService) {
    }

    ngOnInit(): void {
        this.numberOfBooks = this.bookService.numberOfBooks();
    }
}