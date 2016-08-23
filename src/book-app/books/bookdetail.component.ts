import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ROUTER_DIRECTIVES} from '@angular/router';
import {BookService} from "../services/book.service";
import {Book} from "./book.model";

@Component({
    'directives': [ROUTER_DIRECTIVES],
    'providers': [BookService],
    'template': `
        <article *ngIf="bookDetails" >
            <header><h3>{{bookDetails.title}}</h3></header>
            <h4>{{bookDetails.author}}</h4>
            <figure class="imageContainer"><img src="assets/img/{{bookDetails.id}}.png"></figure>
            <p>
                {{bookDetails?.description}}
            </p>
            <footer>{{bookDetails.isbn}}</footer>
        </article>
        <br>
        <a [routerLink]="['/books']">Back</a>
    `
})
export class BookDetailComponent implements OnInit {
    bookDetails:Book;

    constructor(private route:ActivatedRoute,
                private bookService:BookService) {
    }

    ngOnInit():any {
        let id = +this.route.snapshot.params['id'];
        this.bookDetails = this.bookService.getDetails(id);
        console.log("Book is now: " + JSON.stringify(this.bookDetails));
    }

}