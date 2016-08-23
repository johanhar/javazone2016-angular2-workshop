import { Component, OnInit } from '@angular/core';
import { BookRow } from './book-row.component';
import { Book } from './book.model';
import {SearchComponent} from "../search/search.component";
import {BookService} from "../services/book.service";
import {Result} from "./result.component";

@Component({
    'providers': [BookService],
    'selector': 'book-list',
    'directives': [SearchComponent, BookRow, Result],
    'template': `
        <search (onSearchResult)='showResult($event)'></search>
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
                <tr *ngFor='let book of books' [book-row]='book'></tr>
            </tbody>
        </table>
        <result [results]='books'></result>
    `
})
export class BookList implements OnInit {

    books: Book[];

    constructor(private bookService: BookService) {
    }

    ngOnInit(): void {
        this.books = this.bookService.getAll();
    }

    showResult(result: Book[]) {
        this.books = result;
    }

}