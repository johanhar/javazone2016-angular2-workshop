import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BookRow} from "./book-row.component";
import {Book} from "./book.model";
import {BOOK_DATA} from "../services/book.data";
import {BookService} from "../services/book.service";
import {SearchComponent} from "../search/search.component";
import {Result} from "./result.component";

@Component({
    // Oppgave 5.2 legg til providers-attribute her.
    'providers': [BookService],
    'selector': 'books',
    'directives': [SearchComponent, BookRow, Result],
    'template': `
        <!-- Oppgave 7.3 Her må vi binde til vår event som heter 'onSearchResult-->
        <search></search>
        <result #result [results]='books'></result>

        <table *ngIf="!result.isEmpty()">
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
export class Books implements OnInit {
    books: Book[] = [];

    // Oppgave 5.2. Du må legge til constructor med injisert BookService

    ngOnInit(): void {
    //Oppgave 5.2 fjern kommentarer her når bookService er tilgjengelig.
    // this.books = this.bookService.getAll();
    }

    // Oppgave 7.3 Her setter vi søkresultat til komponent.
    // Dette må vi kalle når vi har noe å vise.
    showResult(result: Book[]) {
        this.books = result;
    }

    bookSelected(book: Book) {
        console.log(book);
        // Oppgave 5.3 Navigering til detaljert visning av en bok.
    }
}